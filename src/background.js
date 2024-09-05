'use strict'

import { app, protocol, BrowserWindow, ipcMain, ipcRenderer, dialog, screen, globalShortcut } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require('path')
const Store = require('electron-store');
const store = new Store();
const fs = require('fs');
import axios from 'axios'
import log from 'electron-log';

// Configura `electron-log` per scrivere i log in un file e mostrarli nella console
log.transports.file.level = 'info';
log.transports.console.level = 'info';

const {autoUpdater} = require("electron-updater");

let win;

// autoupdater
process.env.GH_TOKEN = "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d";
autoUpdater.setFeedURL({
	provider: 'github',
	repo: 'MaioraViewFE',
	owner: 'hacaro76',
	private: true,
	token: process.env.GH_TOKEN
})

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

autoUpdater.autoDownload = false; 

function sendStatusToWindow(text) {
  log.info(text);
  win.webContents.send('message', text);
}

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

log.transports.file.resolvePath = (variables) => {
	const dateNow = new Date();
	const month = String(dateNow.getMonth() + 1).padStart(2, '0');
	const day = String(dateNow.getDate()).padStart(2, '0');
	let logName = dateNow.getFullYear() +'-'+ month +'-'+ day +'-'+ variables.fileName;
	return path.join(variables.electronDefaultDir, logName);
}

log.info('App starting...');

async function createWindow() {
	// get display selected
	let selectedDisplay = store.get("displayNum")
	let x = store.get("display" + selectedDisplay +"X")
	let y = store.get("display" + selectedDisplay +"Y")
	
  // Create the browser window.
  win = new BrowserWindow({
    /*width: 1366,
    height: 768,
		fullscreen: false,*/
    width: 1900,
    height: 1060,
    x: x,
    y: y,
		fullscreen: store.get("fullscreen"),
		icon: "./dist_electron/.icon-ico/icon.ico",
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      contextIsolation: false,
	  webSecurity: false, // Disabilita la sicurezza web //hacaro

    }
  })

	// Hide Menu;
	win.setMenu(null)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    //win.loadURL('app://./index.html')
		win.loadFile('index.html')
		//win.webContents.openDevTools()
  }
	
	ipcMain.on('checkAppUpdates', function() {
		//win.webContents.send('downloadstatus', { downloading: true, perc: 0 });
		if (process.platform === 'win32') autoUpdater.checkForUpdates();
  })
	
	ipcMain.on("setFullscreen", (event, arg) => {
		let fullscreenEnabled = arg.fullscreen
		win.setFullScreen(fullscreenEnabled)
  })
	
	ipcMain.on("writeLog", (event, arg) => {
		let level = arg.level
		let data = arg.data
		if (level == 'error') {
			log.error(data)
		} else {
			log.info(data)
		}
  })
	
	ipcMain.on("setDisplay", (event, arg) => {
		let selectedDisplay = arg.display
		store.set("displayNum", selectedDisplay)
		let x = store.get("display" + selectedDisplay +"X")
		let y = store.get("display" + selectedDisplay +"Y")
		win.setBounds({ x: x, y: y })
  })
	
	ipcMain.on("downloadRequest", (event, arg) => {
		const filePath = arg.remotePath
		const fileUrl = store.get("mediaPath") + filePath
		const outputLocationPath = arg.localPath
		const fileExt = fileUrl.substring(fileUrl.lastIndexOf('.'))
		const tempFile = outputLocationPath.replace(fileExt, '.part')
		/*const writer = fs.createWriteStream(outputLocationPath)*/

		return axios({
			method: 'get',
			url: fileUrl,
			responseType: 'stream',
		}).then(response => {
			const writer = fs.createWriteStream(tempFile)
			return new Promise((resolve, reject) => {
				response.data.pipe(writer);
				let error = null;
				writer.on('error', err => {
					error = err.message;
					log.error(error)
					writer.close();
					fs.unlink(outputLocationPath)
					reject(err);
				});
				writer.on('finish', function() {
					if (writer) writer.end()
					if (!error) {
						//log.info('done')
						resolve(true);
						fs.rename(tempFile, outputLocationPath, () => {
							win.webContents.send("downloadResult", { path: fileUrl });
						})
					} else {
						win.webContents.send("downloadError", { path: 'atom://'+ filePath, error: 'Download error: '+ error.message });
						fs.unlink(outputLocationPath)
						log.error(error)
					}
				});
			});
		}).catch((error) => {
			win.webContents.send("downloadError", { path: 'atom://'+ filePath, error: 'Connection error: '+ error.message });
			log.error(error)
		});
	});
	
	// click function on key press
	globalShortcut.register('Ctrl+F12', () => {
    win.webContents.openDevTools()
  })
	globalShortcut.register('Ctrl+F5', () => {
    win.reload()
  })
}

app.on('will-quit', () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

function checkDate(storeItem, dayDiff) {
	let today = new Date()
	let updatedTime = new Date(store.get(storeItem))
	const diffTime = Math.abs(today - updatedTime);
	const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
	let updated = dayDiff > diffDays
	log.info('*** checkDate '+ storeItem +' ****', 'diff '+ dayDiff)
	log.info('today', today.toDateString())
	log.info('updatedTime', updatedTime.toDateString())
	log.info('diffDays', diffDays)
	log.info('up to date', updated)
	return (updated)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  /*if (isDevelopment && !process.env.IS_TEST) {
  }*/
	// Install Vue Devtools
	try {
		await installExtension(VUEJS_DEVTOOLS)
	} catch (e) {
		log.error('Vue Devtools failed to install:', e.toString())
	}
	//store.clear()
	// controllo data aggiornamento
	let updated = (store.has("updated")) ? true : false
	//store.set("updatedTime", new Date('2023-09-13'))
	if (!store.has("updatedTime")) {
		updated = false
	}
	if (updated) {
		updated = checkDate("updatedTime", 1)
	}
	
	// controllo se sono loggato e da quanto
	let token = (store.has("token") && store.get("token") !== "") ? store.get("token") : null
	let logged = (token) ? true : false
	//store.set("loggedTime", new Date('2023-07-19'))
	if (!store.has("loggedTime")) {
		logged = false
	}
	if (logged) {
		logged = checkDate("loggedTime", 30)
	}
	if (!logged) {
		updated = false
		// resetto store in caso di cambio utente
		let users
		if (store.has('users')) {
			users = store.get('users')
		}
		store.clear()
		if (users) store.set('users', users)
	}
	//store.delete('users')
	
	store.set("logged", logged)
	store.set("updated", updated)
	
	log.info('=> token', token)
	log.info('=> logged', logged)
	log.info('=> updated', updated)
	
	// memorizzo dati principali applicazione
	let ver = app.getVersion()
	store.set("ver", ver)

	//let apiPath = (isDevelopment) ? 'http://localhost:8080/MaioraNeoView/api/' : 'https://funny-merkle.93-93-119-34.plesk.page/MaioraNeoView/api/'
	let apiPath = 'https://fixlife.it/MaioraNeoView/api/' // produzione
	store.set("userPath", app.getPath('home'))
	store.set("appPath", app.getPath('appData') +'\\MaioraNeoView\\')
	store.set("apiPath", apiPath)
	store.set("mediaPath", 'https://fixlife.it/MaioraNeoView/public/') // development
	//store.set("mediaPath", 'https://fixlife.it/MaioraNeoView/public/') // produzione
	//if (!store.has("screensaverTimeout")) store.set("screensaverTimeout", 3)
	log.info('apiPath', apiPath)
	
	// vedo se impostare il full-screen
	if (!store.has("fullscreen")) store.set("fullscreen", 1)
	
	// vedo se ho più di un monitor
	if (!store.has("displayNum")) store.set("displayNum", 0)
	if (!store.has("display0X")) store.set("display0X", 0)
	if (!store.has("display0Y")) store.set("display0Y", 0)
	let displays = screen.getAllDisplays()
  let externalDisplay = displays.find((display) => {
		/*console.log('id', display.id)
		console.log('label', display.label)
		console.log('x', display.bounds.x)
		console.log('y', display.bounds.y)*/
    let secondaryExists = display.bounds.x !== 0 || display.bounds.y !== 0
		if (secondaryExists) {
			store.set("display1X", display.bounds.x)
			store.set("display1Y", display.bounds.y)
		}
  })
	
	// protocollo caricamento media file da AppData
  protocol.registerFileProtocol('atom', (request, callback) => {
    //log.info("Get real path: "+ request.url)
    const url = request.url.substr(7)
		const appData = app.getPath('appData')
    //log.info(appData +'\\'+ url)
    callback({ path: appData +'\\MaioraNeoView\\'+ url })
  })
	// protocollo caricamento pdf
  protocol.registerFileProtocol('docs', (request, callback) => {
    //log.info(request.url)
    const url = request.url.substr(7)
		const pdf = store.get("appPath") +'/'+ url
    //log.info(appData +'\\'+ url)
    let pdfwin = new BrowserWindow({
			width: 1920,
			height: 1080,
			icon: "./dist_electron/.icon-ico/icon.ico",
			webPreferences: {
			plugins: true
			}
		})
		pdfwin.setMenu(null)
		pdfwin.loadURL(pdf)
  })
	ipcMain.handle('dialog', (event, method, params) => {       
    dialog[method](params);
  });
	
  createWindow()
})

//-------------------------------------------------------------------
// AUTOUPDATER
//-------------------------------------------------------------------
autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for updates...');
})
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('<strong>Update available: '+ info.version +'</strong>');
	// visualizzo prompt
	dialog.showMessageBox(
		win, 
		{
			type: 'info',
			buttons: ['Install now', 'Install later'],
			defaultId: 0,
			cancelId: 1,
			title: 'Application Update',
			message: 'A new version is available: v. '+ info.version,
			detail: 'Click Install to download update and restart the application to apply the updates.'
		})
		.then(result => {
			if (result.response === 0) {
				sendStatusToWindow('Downloading Update');
				win.webContents.send('downloadstatus', { downloading: true, perc: false });
				autoUpdater.downloadUpdate()
			}
		}
	)
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + Math.round(progressObj.percent) + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  log.info(log_message);
	win.webContents.send('downloadstatus', { downloading: true, perc: Math.round(progressObj.percent) });
})
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  sendStatusToWindow('Update downloaded. Wait for Application to restart!');
	autoUpdater.quitAndInstall()
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
