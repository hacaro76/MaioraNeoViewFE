import { createStore } from 'vuex';
import axios from 'axios'
import router from '../router'

const Store = window.require('electron-store');
const store = new Store();
const fs = window.require('fs');

const util = window.require('util')
const ipcRenderer = window.require('electron').ipcRenderer;

//const writeFile = util.promisify(fs.writeFile)
const access = util.promisify(fs.access)
let tempList = []
let arrFiles = []
let arrDownloaded = []
let arrErrors = []
let filesToUpdate = 0
let filesUpdated = 0

let apiPath = store.get("apiPath")

function writeLog(data, level) {
	console.log(data)
	ipcRenderer.send('writeLog', {
		data: data,
		level: level
	});
}

// funzione aggiornamento lista files heritage
/*const path = window.require("path");
function readFolder(dirname, files = []) {
	// elenco files heritage
	const basename = path.resolve("./")
	try {
		console.log("dirname", dirname)
		
		const fileList = fs.readdirSync(dirname);

		for (let fileName of fileList) {
			const name = `${dirname}/${fileName}`;
			console.log('file name', name)
			// Check if the current file/directory is a directory using fs.statSync
			if (fs.statSync(name).isDirectory()) {
				// If it is a directory, recursively call the getFiles function with the directory path and the files array
				console.log('read subdir', name)
				readFolder(name, files);
			} else {
				// If it is a file, push the full path to the files array
				console.log('push to array', name.replace(basename +'\\', ''))
				files.push(name);
			}
		}

	} catch (error) {
		console.log('checkFolder error: '+ error);
	}
	
	// convert array to json
	let json = []
	if (files.length) {
		files.forEach(function(fileName) {
			json.push({ src: fileName.replace(basename +'\\', '') });
		})
	}
	fs.writeFile(path.resolve("./heritage/heritage-files.json"), JSON.stringify(json, null, 4), (error) => {
		if (error) {
			console.log('An error has occurred ', error);
			return;
		}
  });
	return files;
}*/

export default createStore({
  state: {
		boatItems: [],
		screensavers: [],
		availableDocs: [],
		fleetItems: [],
		remotePath: process.env.REMOTE_PATH,
		offline: null,
		logged: store.get("logged"),
		token: store.has("token") ? store.get("token") : '',
		appStarted: false,
		videPlaying: false,
		timeoutApp: 0
  },
  mutations: {
		UPDATE_STATE(state, playload) {
			state.offline = playload
			//console.log('UPDATE_STATE', state.offline);
		},
		UPDATE_TOKEN(state, playload) {
			state.token = playload
			store.set('token', playload)
			let logged = (playload !== "") ? true : false
			state.logged = logged
			store.set("logged", logged)
			writeLog('UPDATE TOKEN: '+ playload +' Logged: '+ logged, 'info')
			//console.log('UPDATE_TOKEN', state.offline);
		},
		UPDATE_BOATS_LIST(state, playload) {
			state.boatItems = playload
			//tempList = []
			console.log('UPDATE_BOATS_LIST', state.boatItems);
		},
		APP_STARTED(state, playload) {
			state.appStarted = playload
		},
		VIDEO_PLAYING(state, playload) {
			state.videPlaying = playload
		},
		UPDATE_SCREENSAVERS_LIST(state, playload) {
			state.screensavers = playload
			console.log('UPDATE_SCREENSAVERS_LIST', state.screensavers);
		},
		UPDATE_TIMEOUT(state, playload) {
			state.timeoutApp = playload
			//console.log('UPDATE_TIMEOUT', state.timeoutApp);
		},
		UPDATE_AVAILABLE_LIST(state, playload) {
			if (state.availableDocs.indexOf(playload) === -1) {
				state.availableDocs.push(playload);
				//console.log('UPDATE_AVAILABLE_LIST', state.availableDocs);
			}
		},
		RESET_AVAILABLE_LIST(state) {
			state.availableDocs = []
			//console.log(state.availableDocs);
		}
  },
  actions: {
		updateToken({ commit }, value) {
			commit('UPDATE_TOKEN', value)
		},
		//getOfflineBoatItems({ commit, state }) {
		getOfflineBoatItems({ commit, state, dispatch }) {
			console.log('getOfflineBoatItems - check offline')
			let boatsList
			if (store.has("boatsList") && store.get("boatsList").length) {
				//console.log('boatsList from store')
				boatsList = store.get("boatsList")
				commit('UPDATE_BOATS_LIST', boatsList)
			}
			// controllo stato online
			//let token = store.get("token")
			let url = apiPath +'boatsv2/?token='+ state.token
			if (store.has("levelId") && store.get("levelId") !== "3") url = apiPath +'boatsv2/?username='+ store.get("username")
			writeLog('getOfflineBoatItems url: '+ url, 'info')
			let resultOutput = (document.getElementById('result')) ? document.getElementById('result') : null
			axios
			.get(url)
			.then((response) => {
				if (response.data.error) {
					let error = response.data.error
					//window.alert(error)
					writeLog('getOfflineBoatItems error: '+ error, 'error')
					if (resultOutput) {
						resultOutput.classList.add('error')
						resultOutput.innerHTML = error
					}
					if (error == "User not found!") dispatch('logOut')
				} else {
					tempList = response.data
					//console.log(response.data)
					writeLog("getOfflineBoatItems Success")
					commit('UPDATE_STATE', false)
					if (!boatsList) {
						writeLog('boatsList from tempList offline')
						commit('UPDATE_BOATS_LIST', tempList)
					}
				}
			})
			.catch((error) => {
				writeLog("getOfflineBoatItems call unsuccessful :( "+ error, 'error')
				writeLog("=> set OFFLINE")
				commit('UPDATE_STATE', true)
				if (resultOutput) {
					resultOutput.classList.add('error')
					resultOutput.innerHTML = 'Network error: '+ error
				}
				if (!store.has("boatsList")) window.alert("You need to be online the first time you launch the application!")
			})
		},
		getScreensavers({ commit }) {
			if (store.has("screensaverEnabled") && store.get("screensaverEnabled") == 1) {
				let screensavers
				if (store.has("screensaversList") && store.get("screensaversList").length) {
					console.log('screensaversList from store')
					screensavers = store.get("screensaversList")
					commit('UPDATE_SCREENSAVERS_LIST', screensavers)
					console.log(screensavers);

				}
				axios
				.get(apiPath +'screensavers/')
				.then((response) => {
					if (response.data.error) {
						window.alert(response.data.error)
						//commit('UPDATE_STATE', true)
					} else {
						screensavers = response.data
						writeLog('getScreensavers')
						console.log('getScreensavers', screensavers)
						commit('UPDATE_SCREENSAVERS_LIST', screensavers)
						if (screensavers.length) {
							store.set("screensaversList", screensavers)
							if (router.currentRoute.value.name !== 'settings') commit('APP_STARTED', true)
						}
						console.log(response.data)
					}
				})
				.catch((error) => {
					writeLog("getScreensavers call unsuccessful :( "+ error, 'error')
					writeLog("=> set OFFLINE")
					commit('UPDATE_STATE', true)
					if (!store.has("screensaversList")) window.alert("You need to be online to get screensavers!")
				})
			} else {
				console.log("screensaver NOT Enabled")
			}
		},
		resetArrangements() {
			// resets active state of arrangements accordion
			//console.log("resetArrangements")
			const buttons = document.querySelectorAll('.preview-img')
			if (buttons) {
				buttons.forEach((element, index) => {
					element.classList.remove('active')
					if (index == 0) element.classList.add('active')
				})
			}
		},
		removeUnreachable({ commit, dispatch }, callback) {
			Object.keys(tempList).forEach(function(line) {
				let lineList = tempList[line].boats
				//console.log(lineList)
				Object.keys(lineList).forEach(function(key) {
					let boatList = lineList[key]
					for (let i =0; i < boatList.length; i++) {
						//console.log(boatList[i].id)
						let boatItem = boatList[i]
						Object.keys(boatItem).forEach(function(boatkey) {
							let value = boatItem[boatkey]
							let imgpath
							if ((boatkey == 'video' || boatkey == 'cover' || boatkey == 'profile') && arrErrors.indexOf(value) !== -1) {
								//console.log('splice '+ boatkey +' - value: '+ value)
								if (boatItem[boatkey]) {
									delete boatItem[boatkey]
									console.log('removeUnreachable', boatkey)
								}
							}
							if (boatkey == 'interiors' || boatkey == 'exteriors') {
								Object.keys(value).forEach(function(gallerykey) {
									if (value[gallerykey]) {
										imgpath = value[gallerykey].src
										if (arrErrors.indexOf(imgpath) !== -1) {
											value.splice(gallerykey, 1)
											console.log('removeUnreachable', imgpath)
										}
									}
								})
							}
							if (boatkey == 'arrangements') {
								Object.keys(value).forEach(function(arrangementskey) {
									if (value[arrangementskey]) {
										imgpath = value[arrangementskey].image
										if (arrErrors.indexOf(imgpath) !== -1) {
											value.splice(arrangementskey, 1)
										}
									}
								})
							}
						})
					}
				})
			})
			if (callback) {
				commit('UPDATE_BOATS_LIST', tempList)
				store.set("updated", true)
				arrErrors = []
				dispatch(callback)
			}
		},
		checkUpdating({ commit, dispatch }) {
			filesToUpdate = arrFiles.length
			console.log('*** checkUpdating ***')
			console.log('filesToUpdate: '+ filesToUpdate +' filesUpdated: '+ filesUpdated)
			console.log("tempList", Object.keys(tempList).length)
			let resultOutput = document.getElementById('result')
			if (filesToUpdate == 0) {
				// se non ci sono file da aggiornare memorizzo dati in locale
				if (Object.keys(tempList).length) {
					commit('UPDATE_BOATS_LIST', tempList)
					store.set("boatsList", tempList)
					store.set("updated", true)
					store.set("updatedTime", new Date())
				}
				if (resultOutput) {
					resultOutput.innerHTML = 'Nothing to update'
					resultOutput.classList.remove('error')
					resultOutput.classList.add('success')
					setTimeout(() => {
						console.log('startApp from CheckUpdating - no updates')
						dispatch('startApp', { root: true })
					}, 2000)
				} else {
					dispatch('getScreensavers')
				}
				document.getElementById('updating').classList.add('d-none')
			} else {
				// aggiorno il numero di file da scaricare
				document.getElementById('download-progress').setAttribute('aria-valuemax', filesToUpdate)
				console.log("errori", arrErrors.length)
				//if (filesUpdated == filesToUpdate && Object.keys(tempList).length) {
				if (filesUpdated == filesToUpdate) {
					if (arrErrors.length) {
						console.log(arrErrors)
						// rimuovo dalla visualizzazione le immagini che non posso scaricare
						dispatch('removeUnreachable')
						// visualizzo errori
						let strError = ''
						if (resultOutput) {
							arrErrors.map(function(value, index) {
								arrErrors[index] = value.replace('atom://media/', '')
							})
							strError = arrErrors.join('<br>')
							resultOutput.innerHTML = '<p class="error">Unable to copy following file/s:</p>'+ strError +'<p style="font-weight: bold;">Please, retry updating process!</p>'
						} else {
							strError = arrErrors.join('\n')
							writeLog(strError, 'error')
							let result = window.alert('Unable to copy following files:\n\n'+ strError +'\n\nPlease, retry updating process!')
							if (result) arrErrors = []
						}
					} else {
						if (resultOutput) {
							resultOutput.innerHTML = 'Copy completed!'
							resultOutput.classList.remove('error')
							resultOutput.classList.add('success')
							setTimeout(() => {
								console.log('startApp from CheckUpdating - updated')
								dispatch('startApp', { root: true })
							}, 2000)
						} else {
							dispatch('getScreensavers')
						}
					}
					// aggiorno elenco barche
					console.log("Done!");
					//console.log('boatsList from tempList saveblob')
					commit('UPDATE_BOATS_LIST', tempList)
					store.set("boatsList", tempList)
					store.set("updated", true)
					store.set("updatedTime", new Date())
					
					document.getElementById('updating').classList.add('d-none')
				}
			}
		},
		async saveBlobToFile({ dispatch }, playload) {
			let localpath = playload.localpath
			let remotepath = playload.remotepath
			console.log('Copy '+ remotepath +' => '+ localpath)
			if (document.getElementById('result')) document.getElementById('result').innerHTML = 'Copying files...'
			this.updating = true
			// creo cartelle in appPath
			let separator = localpath.lastIndexOf("/")
			let dir = localpath.substr(0, separator)
			//console.log('checkFolder:'+ dir)
			if (!fs.existsSync(dir)){
				fs.mkdirSync(dir, { recursive: true });
			}
			// salvo file
			ipcRenderer.send("downloadRequest", { 
				localPath: localpath,
				remotePath: remotepath
			})
			ipcRenderer.on('downloadResult', (event, data) => {
				//console.log('downloadResult path', data.path);
				if (data.path !== '' && arrDownloaded.indexOf(data.path) == -1) {
					console.log('downloaded '+ data.path)
					arrDownloaded.push(data.path)
					filesUpdated = arrDownloaded.length
					document.getElementById('download-progress').setAttribute('value', filesUpdated)
					document.getElementById('label-progress').innerHTML = filesUpdated +' / '+ filesToUpdate
					dispatch('checkUpdating')
				}
			})
			ipcRenderer.on('downloadError', (event, data) => {
				writeLog('downloadError path :'+ data.path, 'error')
				writeLog('downloadError: '+ data.error, 'error')
				if (data.path !== '' && arrErrors.indexOf(data.path) == -1) {
					console.log('ERROR downloading '+ data.path)
					arrErrors.push(data.path)
					arrDownloaded.push(data.path)
					filesUpdated = arrDownloaded.length
					document.getElementById('download-progress').setAttribute('value', filesUpdated)
					document.getElementById('label-progress').innerHTML = filesUpdated +' / '+ filesToUpdate
					dispatch('checkUpdating')
				}
			})
		},
		async checkFile({ dispatch }, playload) {
			const mediaPath = store.get("appPath")
			let path = playload.path
			let localpath = mediaPath + path
			let remotepath = path
			if (path.substr(0, 7) == 'atom://') {
				localpath = path.replace('atom://', mediaPath)
				remotepath = path.replace('atom://', '')
			}
			if (path.substr(0, 7) == 'docs://') {
				localpath = path.replace('docs://', mediaPath)
				remotepath = path.replace('docs://', '')
			}
			//console.log('checkFile', path)
			//console.log('localpath', localpath)
			//if (playload.checkonly) return false
			access(localpath, fs.F_OK, (err) => {
				if (err) {
					// controllo che non sia già tra i file in download
					if (arrFiles.indexOf(path) === -1) {
						arrFiles.push(path)
						filesToUpdate = arrFiles.length
						document.getElementById('download-progress').setAttribute('max', filesToUpdate)
						console.log('File doesn\'t exists => Add to array '+ localpath +' - checkonly: '+ playload.checkonly +' filesToUpdate', filesToUpdate)
						if (playload.checkonly) {
							arrErrors.push(path)
						} else {
							console.log('Copy '+ remotepath +' => '+ localpath)
							dispatch('saveBlobToFile', {remotepath: remotepath, localpath: localpath})
						}
					}
				}
			})
		},
		async checkFiles({ dispatch }, checkonly) {
			console.log('checkFiles', tempList)
			console.log('checkonly', checkonly)
			let boatItem
			let playload
			let boatsChecked = 0
			let boatsCount = 0
			//let linesCount = Object.keys(tempList).length
			
			// genero json file heritage
			/*let dirname = path.resolve("./heritage")
			let heritageFiles = readFolder(dirname);
			console.table(heritageFiles)*/
			
			// scarico localmente i file heritage
			axios
			.get(apiPath +'heritagefiles/')
			.then((response) => {
				if (response) {
					let heritageList = response.data
					//console.log('heritageList', heritageList)
					heritageList.forEach(function(line) {
						//console.log(line.src)
						playload = { path: line.src, checkonly: checkonly}
						dispatch('checkFile', playload)
					})
				}
			})
			.catch((error) => {
				writeLog("get heritagefiles call unsuccessful :( "+ error, 'error')
			})
			/*playload = { path: 'atom://media/video-teaser.mp4', checkonly: checkonly}
			dispatch('checkFile', playload)*/
			
			// scarico localmente gli screensavers
			if (store.has("screensaversList") && store.get("screensaverEnabled")) {
				let screensavers = store.get("screensaversList")
				if (screensavers.length) {
					for (let i = 0; i < screensavers.length; i++) {
						let playload = { path: screensavers[i].path, checkonly: false}
						dispatch('checkFile', playload)
					}
				}
			}
			
			// scarico localmente i file di yacht e flotte
			Object.keys(tempList).forEach(function(line) {
				let lineList = tempList[line].boats
				if (!lineList) return
				//console.log(lineList)
				Object.keys(lineList).forEach(function(key) {
					let boatList = lineList[key]
					boatsCount += boatList.length
					for (let i =0; i < boatList.length; i++) {
						//console.log(boatList[i].id)
						boatItem = boatList[i]
						let itemsChecked = 0
						Object.keys(boatItem).forEach(function(boatkey) {
							let value = boatItem[boatkey]
							let imgpath, thumbpath, docpath
							if ((boatkey == 'video' || boatkey == 'cover' || boatkey == 'profile') && value) {
								playload = { path: value, checkonly: checkonly}
								dispatch('checkFile', playload)
							}
							// check galleries
							if (boatkey == 'interiors' || boatkey == 'exteriors') {
								Object.keys(value).forEach(function(gallerykey) {
									// image
									imgpath = value[gallerykey].src
									playload = { path: imgpath, checkonly: checkonly}
									if (imgpath) dispatch('checkFile', playload)
									// thumb
									thumbpath = value[gallerykey].thumb
									playload = { path: thumbpath, checkonly: checkonly}
									if (thumbpath) dispatch('checkFile', playload)
								})
							}
							// check arrangements
							if (boatkey == 'arrangements') {
								Object.keys(value).forEach(function(arrangementskey) {
									// image
									imgpath = value[arrangementskey].image
									playload = { path: imgpath, checkonly: checkonly}
									if (imgpath) dispatch('checkFile', playload)
								})
							}
							// check documents
							if (boatkey == 'docs') {
								Object.keys(value).forEach(function(typeskey) {
									let docList = value[typeskey]
									Object.keys(docList).forEach(function(documentskey) {
										docpath = docList[documentskey].src
										playload = { path: docpath, checkonly: checkonly}
										if (docpath) dispatch('checkFile', playload)
									})
								})
							}
							itemsChecked++
							if (itemsChecked == Object.keys(boatItem).length) boatsChecked++
							//console.log('itemsChecked '+ itemsChecked +' tot: '+ Object.keys(boatItem).length +' boatsChecked: '+ boatsChecked)
							
						})
						
					}
				})
			})
			//console.log('boatsCount '+ boatsCount +' boatsChecked: '+ boatsChecked)

			if (boatsChecked == boatsCount) {
				/*return false*/
				setTimeout(() => {
					if (checkonly) {
						console.log('filesToUpdate', filesToUpdate)
						let resultOutput = document.getElementById('result')
						if (filesToUpdate) {
							resultOutput.innerHTML = filesToUpdate +' updates available!'
							resultOutput.classList.remove('success')
							resultOutput.classList.add('error')
							document.getElementById('updating').classList.add('d-none')
						} else {
							store.set("updated", true)
							store.set("updatedTime", new Date())
							resultOutput.innerHTML = 'Nothing to update'
							resultOutput.classList.remove('error')
							resultOutput.classList.add('success')
							document.getElementById('updating').classList.add('d-none')
							console.log('startApp from CheckFiles - checkonly')
							dispatch('startApp', { root: true })
						}
					} else {
							dispatch('checkUpdating')
					}
				}, 3000)
			}
		},
		async getBoatItems ({ dispatch, state }, checkonly) {
			writeLog('updateFiles => getBoatItems - checkonly: '+ checkonly)
			// resetto variabili
			filesUpdated = 0
			filesToUpdate = 0
			arrFiles = []
			arrDownloaded = []
			arrErrors = []
			let label1 = document.getElementById('download-label')
			let label2 = document.getElementById('label-progress')
			if (checkonly) {
				label1.innerHTML = 'Checking changes '
				label2.innerHTML = 'please wait!'
			} else {
				label1.innerHTML = 'Downloading progress: '
				label2.innerHTML = 'checking changes, please wait!'
			}
			document.getElementById('download-progress').setAttribute('value', '0')
			document.getElementById('updating').classList.remove('d-none')
			let resultOutput = (document.getElementById('result')) ? document.getElementById('result') : null
			if (resultOutput) {
				resultOutput.classList.remove('error')
				resultOutput.innerHTML = 'Checking updates...'
			}
			
			let url = apiPath +'boatsv2/?token='+ state.token
			if (store.has("levelId") && store.get("levelId") !== "3") url = apiPath +'boatsv2/?username='+ store.get("username")
			writeLog('getBoatItems url: '+ url, 'info')
			axios
			.get(url)
			.then((response) => {
				if (response.data.error) {
					let error = response.data.error
					//window.alert(error)
					writeLog('getBoatItems error: '+ error, 'error')
					document.getElementById('updating').classList.add('d-none')
					if (resultOutput) {
						resultOutput.classList.add('error')
						resultOutput.innerHTML = error
					}
					if (error == "User not found!") dispatch('logOut')
					return error
				} else {
					tempList = response.data
					//console.log('tempList', tempList)
					dispatch('checkFiles', checkonly)
				}
			})
			.catch((error) => {
				writeLog("getBoatItems call unsuccessful :( "+ error, 'error')
				if (resultOutput) {
					resultOutput.classList.add('error')
					resultOutput.innerHTML = 'Network error: '+ error
				}
				return error
			})
		},
		closeVideo({ dispatch }) {
			let videodiv = document.getElementById("box-video")
			let video = document.getElementById("fullscreen-video")
			video.pause()
			videodiv.classList.remove('show')
			video.currentTime = 0
			dispatch('videoStarted', false)
			document.body.style.overflowY = 'auto'
		},
		playVideo({ dispatch }) {
			document.body.style.overflowY = 'hidden'
			let video = document.getElementById("fullscreen-video")
			let videodiv = document.getElementById("box-video")
			videodiv.classList.add('show')
			var playPromise = video.play()
			if (playPromise !== undefined) {
				playPromise.then(function() {
					// Automatic playback started!
					dispatch('videoStarted', true)
				}).catch(function(error) {
					// Automatic playback failed.
					let videoPath = video.src
					writeLog(videoPath +' play failed: '+ error, 'error')
				});
			}
			/*video.addEventListener("ended", () => {
				this.closeVideo()
			}, false)*/
		},
		logOut({ dispatch }) {
			store.delete('name')
			store.delete('username')
			store.delete('levelId')
			store.delete("boatsList")
			store.delete('loggedTime')
			store.delete('updatedTime')
			store.delete('screensaverEnabled')
			store.set("updated", false)
			store.set("logged", false)
			dispatch('updateToken', '')
			router.push('/settings')
		},
		startApp({ dispatch }) {
			if (arrErrors.length) {
				dispatch('removeUnreachable', 'goHome')
			} else {
				dispatch('goHome')
			}
		},
		goHome() {
			console.log('=> goHome')
			// reload home page dopo aggiornamento per caricare i nuovi file
			router.push('/').then(() => { router.go() })
		},
		goBack() {
			history.back()
		},
		startedApp({ commit }) {
			commit('APP_STARTED', true)
		},
		pausedApp({ commit }) {
			commit('APP_STARTED', false)
		},
		videoStarted({ commit }, started) {
			//console.log('videoStarted', started)
			commit('VIDEO_PLAYING', started)
		},
		setTimeout({ commit }, timeout) {
			//console.log('timeout', timeout)
			commit("UPDATE_TIMEOUT", timeout)
		},
		resetTimeout({ commit }) {
			//console.log('resetTimeout')
			commit("UPDATE_TIMEOUT", 0)
		},
  },
  getters: {
		isOffline: state => state.offline,
		isStarted: state => state.appStarted,
		isVideoPlaying: state => state.videPlaying,
		remotePath: state => state.remotePath,
		checkLogged: state => state.logged,
		getToken: state => state.token,
		boatItems: (state) => {
			let boatItems = state.boatItems.filter((item) => item.type == 'yacht')
			//console.log("boatItems: ", boatItems);
			return boatItems
		},
		boatItemFromId: (state) => (id) => {
			let boatItem
			Object.keys(state.boatItems).forEach(function(line) {
				let lineList = state.boatItems[line].boats
				if (!lineList) return
				//console.log(lineList)
				Object.keys(lineList).forEach(function(key) {
					let boatList = lineList[key]
					for (let i =0; i < boatList.length; i++) {
						//console.log(boatList[i].id)
						if (boatList[i].id === id) {
							boatItem = boatList[i]
							return boatItem
						}
					}
				})
			})
			//console.log("boatItemFromId - id: "+ id, boatItem);
			return boatItem
		},
		boatItemFromIdBoat: (state) => (id) => {
			let boatItem = state.boatItems.find((boatItem) => boatItem.id_boat === id)
			//console.log("boatItemFromId - id: "+ id, boatItem);
			return boatItem
		},
		fleetItems: (state) => {
			let fleetItems = state.boatItems.filter((item) => item.type == 'fleet')
			//console.log("fleetItems: ", fleetItems);
			return fleetItems
		},
		fleetItemFromId: (state) => (id) => {
			//console.log("fleetItemFromId - id: "+ id);
			let fleetItem
			Object.keys(state.boatItems).forEach(function(line) {
				let lineList = state.boatItems[line].boats
				//console.log(lineList)
				Object.keys(lineList).forEach(function(key) {
					let boatList = lineList[key]
					for (let i =0; i < boatList.length; i++) {
						//console.log(boatList[i].id)
						if (boatList[i].id === id) {
							fleetItem = boatList[i]
							return fleetItem
						}
					}
				})
			})
			//console.log("fleetItemFromId - id: "+ id, fleetItem);
			return fleetItem
		},
		availableDocs: state => state.availableDocs,
		screensavers: (state) => state.screensavers,
		timeout: (state) => state.timeoutApp
  },
})