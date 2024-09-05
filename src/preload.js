// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld( 'api', {
	send: ( channel, data ) => ipcRenderer.invoke( channel, data ),
	handle: ( channel, callable, event, data ) => ipcRenderer.on( channel, callable( event, data ) )
})

/*contextBridge.exposeInMainWorld('electronAPI',{
	openDialog: (method, config) => ipcRenderer.invoke('selectDirectory', method, config),
  getUserPath: () => ipcRenderer.invoke('getUserPath')
})*/

window.addEventListener('DOMContentLoaded', () => {
	document.getElementById('close-app').addEventListener('click', () => {
		ipcRenderer.invoke('quit-app');
	});
})
