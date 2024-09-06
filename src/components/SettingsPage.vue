<template>
  <div id="content" class="text-center">
    <h1 class="my-2">Settings</h1>

		<div class="flex-around">
			
			<div class="box">
				
				<div v-if="logged && !edit">
					<h2 class="my-2">User logged</h2>
					<p>{{ name }}</p>
					<p>
						<!--<button type="button" class="btn btn-gold my-2" @click="editUser">Edit username / password</button><br>-->
						<button type="button" class="btn btn-gold my-2" @click="logOut">Log out / Change user</button>
					</p>
				</div>
				
				<div v-if="!logged || edit">
					
					<h2 class="my-2" v-if="!logged">Log in</h2>
					<h2 class="my-2" v-if="edit">Edit Username / Password</h2>
					
					<p class="result error" v-if="errormsg !== ''">{{ errormsg }}</p>
					<p>
						<label class="label" for="username">
							Username:
						</label>
						<span class="input">
							<input type="username" v-model="input.username" id="username" @keyup="checkUser" style="width: 100%;">
							<select id="userselect" :class="(!showoptions) ? 'd-none' : ''"></select>
						</span>
					</p>
					<p v-if="edit">
						<label class="label" for="oldpassword">
							Old Password:
						</label>
						<input type="password" v-model="input.oldpassword" id="oldpassword" class="input" @keyup="resetError">
					</p>
					<p>
						<label class="label" for="password">
							<span v-if="edit">New </span>Password:
						</label>
						<input type="password" v-model="input.password" id="password" class="input" @keyup="resetError">
					</p>
					<p v-if="!logged">
						<label>
							<input type="checkbox" value="1" id="rememberme" v-model="input.rememberme">
							Remember access data
						</label>
					</p>
					<p>
						<button type="button" v-if="!logged" class="btn btn-gold my-2" @click="logIn">Log in</button>
						<button type="button" v-if="edit" class="btn btn-gold my-2 mx-2" @click="saveUser">Save changes</button>
						<button type="button" v-if="edit" class="btn btn-gold my-2 mx-2" @click="stopEdit">Cancel</button>
					</p>
				</div>
			</div>
			<!--uncomment to rectivate screensver settings box-->
			<!--<div class="box">
				<h2 class="my-2">Screensaver</h2>

				<p>
					<label>
						<input type="checkbox" class="logged" value="1" id="screensaver" v-model="checked" @click="checkScreensavers">
						Enable screensaver
					</label>
				</p>

				<div v-if="screensavers && checked">
					<p class="result success">
						{{ screensavers.length }} screensavers found 
						<down-icon v-if="!screensaverListShow" class="btn-show" @click="showList"></down-icon>
						<up-icon v-if="screensaverListShow" class="btn-show" @click="hideList"></up-icon>
					</p>
					<div class="list">
						<ul>
							<li v-for="(screensaver, index) in screensavers" :key="index"> {{ screensaver?.path ? screensaver.path.replace('atom://media/screensavers/', '') : 'Path not available' }}</li>						</ul>
					</div>
				</div>

				<p v-if="screensavers && checked">
					<label>
						Set Screensaver timeout in minutes:
						<input type="number" class="logged" v-model="screensaverTimeout" id="screensaverTimeout" @change="setTimeout" style="margin-left: 8px; width: 50px;">
					</label>
				</p>

				<p v-if="screensavers && checked">
					<em>(Set timeout to 0 to hide screensaver)</em>
				</p>
			</div>-->
			
			<div class="box">
				<h2 class="my-2">Display settings</h2>
				
				<div v-if="secondaryscreenExists" style="text-align: left;">
					<label>Select display monitor
						<select id="set-screen" v-model="screenSelected" style="margin-left: 8px;" @change="setDisplay">
							<option value="0">Primary monitor</option>
							<option value="1">Secondary monitor</option>
						</select>
					</label>
				</div>
				
				<div class="my-2" style="text-align: left;">
					<label>
						<input type="checkbox" class="logged" value="1" id="fullscreen" v-model="fullscreen" @click="setFullscreen">
						Full-screen enabled
					</label>
				</div>

				<ul class="my-2" style="text-align: left;">
					<li><strong>Optimal resolution: 1920x1080px</strong></li>
					<li><strong>Layout resize: 100%</strong> 
						<ul>
							<li>=> Display settings</li>
							<li>=> Scale and Layout / Impostazioni schermo</li>
							<li>=> Ridimensionamento e layout</li>
						</ul>
					</li>
					<li><strong>Auto-hide Taskbar</strong></li>
				</ul>
			</div>
			
			<div class="box-full">
				<h2 :class="[(!isOffline) ? 'success' : 'error', 'my-2']">State: {{ (!isOffline) ? 'online' : 'offline' }}</h2>

				<p>
					Current version: <span id="version">X.Y.Z</span> 
					<span id="messages"></span><br>
				</p>
				<ProgressBar v-if="downloading" :mode="mode" :value="downloadperc" id="progressbar">{{ downloadperc }}%</ProgressBar>

				<div id="result-box">
					<div id="result" class="result"></div>
				</div>

				<button v-if="!isOffline" type="button" class="btn btn-gold my-2 mx-2 logged" @click="updateFiles">Update files and Start</button>
				<button v-if="!pendingupdate" type="button" id="start-noupdate" class="btn btn-gold my-2 mx-2 logged" @click="startApp">Start without updating</button>

			</div>
			
		</div>
		
  </div>
</template>

<script>
	import 'vue-material-design-icons/styles.css'
	//uncomment to rectivate screensver settings box
	//import UpIcon from 'vue-material-design-icons/ChevronUp'
	//import DownIcon from 'vue-material-design-icons/ChevronDown'
	
	import ProgressBar from 'primevue/progressbar';
	import "primevue/resources/themes/saga-orange/theme.css";
	
	import axios from 'axios';
	
	const Store = window.require('electron-store');
	const store = new Store();
	const apiPath = store.get("apiPath")
	
  import CryptoJS from 'crypto-js'
	
	//const log = require('electron-log');
	const ipcRenderer = window.require('electron').ipcRenderer;
	
	export default {
		name: 'SettingsPage',
		data() {
      return {
				updated: store.get("updated"),
				needtoupdate: false,
				pendingupdate: false,
				edit: false,
				showoptions: false,
				errormsg: '',
				checked: false,
				mode: 'indeterminate',
				downloading: false,
				downloadperc: 0,
				fullscreen: store.get("fullscreen"),
				secondaryscreenExists: (store.has("display1X")) ? true : false,
				screenSelected: store.get("displayNum"),
				screensaverTimeout: (store.has("screensaverTimeout")) ? store.get("screensaverTimeout") : 0,
				name: (store.has("name")) ? store.get("name") : '',
				screensaverListShow: false,
				input: {
					username: (store.has("username")) ? store.get("username") : '',
					password: '',
					oldpassword: '',
					rememberme: false
				}
      }
		},
		computed: {
			screensavers () {
				return this.$store.getters.screensavers
			},
			isOffline () {
				return this.$store.getters.isOffline
			},
			logged() {
				return this.$store.getters.checkLogged
			}
		},
		mounted() {
			// Display the current version
			let version = store.get("ver")
			document.getElementById('version').innerText = version;
			
			if (!this.isOffline && this.logged) ipcRenderer.send('checkAppUpdates')
			
			ipcRenderer.on('message', function(event, text) {
				var container = document.getElementById('messages');
				container.innerHTML = " - "+ text;
			})

			let that = this
			ipcRenderer.on('downloadstatus', function(event, response) {
				that.updateProgress(response)
			})

			this.fullscreen = (store.get("fullscreen") === 0) ? false : true

			this.needtoupdate = !store.get("updated")
			if (this.logged) {
				this.activateButtons();
				this.checked = (!store.has("screensaverEnabled") || store.get("screensaverEnabled") === 0) ? false : true
				if (this.checked) {
					this.getScreensavers();
				}
			} else {
				this.needtoupdate = true
				this.deactivateButtons();
			}
			
			// carico dati memorizzati se ho un solo user memorizzato
			if (store.has('users')) {
				let users = JSON.parse(store.get('users'))
				if (users.length == 1) {
					this.input.username = CryptoJS.AES.decrypt(users[0].username, "Azimut").toString(CryptoJS.enc.Utf8)
					this.input.password = CryptoJS.AES.decrypt(users[0].password, "Azimut").toString(CryptoJS.enc.Utf8)
					this.showoptions = false
					this.input.rememberme = true
					this.log("Get user data from store: "+ this.input.username)
				}
			}
			//store.delete('users')
		},
		watch: {
			screensaverEnabled() {
				if (this.checked) {
					this.getScreensavers();
				}
			},
			isOffline () {
				if (this.logged && !this.isOffline) this.checkUpdates()
			},
			logged() {
				this.needtoupdate = !store.get("updated")
				//console.log('needtoupdate', this.needtoupdate)
				if (this.logged) {
					let username = store.get("name")
					this.log('User logged access: '+ username)
					this.name = username
					this.checked = (!store.has("screensaverEnabled") || store.get("screensaverEnabled") === 0) ? false : true
					this.activateButtons();
				} else {
					this.deactivateButtons();
				}
			}
		},
		methods: {
			log(data, level) {
				console.log(data)
				ipcRenderer.send('writeLog', {
					data: data,
					level: level
				});
			},
			updateProgress(response) {
				this.downloading = response.downloading
				if (response.perc) {
					this.mode = 'determinate'
					this.downloadperc = response.perc 
				}
			},
			checkUpdates() {
				if (!this.updated) {
					this.log('checkUpdates - offline', this.isOffline)
					if (!this.isOffline) {
						let response = this.$store.dispatch('getBoatItems', true)
						if (response) {
							this.errormsg = response
						}
					} else {
						store.set("updated", true)
						this.startApp()
					}
				}
			},
			updateFiles() {
				this.log("updateFiles from Setting page")
				this.$store.dispatch('getBoatItems', false)
				this.needtoupdate = false
				this.pendingupdate = false
			},
			setDisplay(event) {
				ipcRenderer.send('setDisplay', {
					display: event.target.value
				});
			},
			getScreensavers() {
				this.$store.dispatch('getScreensavers')
			},
			updateUserSettings(objname, val) {
				if (store.has('users')) {
					let users = []
					let that = this
					users = JSON.parse(store.get('users'))
					users.forEach(function(user) {
						// aggiorno dati esistenti
						if (CryptoJS.AES.decrypt(user.username, "Azimut").toString(CryptoJS.enc.Utf8) == that.input.username) {
							user[objname] = val
							that.log('Update User '+ that.input.username +' settings: '+ objname +' = '+ val)
							return
						}
					})
					store.set('users', JSON.stringify(users))
					//console.log(users)
				}
			},
			checkScreensavers(event) {
				let checked = event.target.checked
				if (checked) {
					store.set("screensaverEnabled", 1)
					this.getScreensavers()
					this.pendingupdate = true
				} else {
					store.set("screensaverEnabled", 0)
					this.screensaverTimeout = 0
				}
				this.setTimeout()
				// memorizzo scelta
				this.updateUserSettings('screensaverEnabled', checked)
			},
			setFullscreen(event) {
				let checked = event.target.checked
				if (checked) {
					store.set("fullscreen", 1)
				} else {
					store.set("fullscreen", 0)
				}
				ipcRenderer.send('setFullscreen', {
					fullscreen: checked
				});
			},
			setTimeout() {
				store.set("screensaverTimeout", this.screensaverTimeout)
				this.updateUserSettings('screensaverTimeout', this.screensaverTimeout)
				this.log("Set screensaverTimeout: "+ this.screensaverTimeout)
			},
			showList() {
				let list = document.querySelector('.list')
				list.classList.add('show')
				this.screensaverListShow = true
			},
			hideList() {
				let list = document.querySelector('.list')
				list.classList.remove('show')
				this.screensaverListShow = false
			},
			activateButtons() {
				let that = this
				let inputs = document.querySelectorAll('.logged')
				inputs.forEach(function(element) {
					if (that.needtoupdate && element.id == "start-noupdate") {
						// non attivo pulsante senza update
					} else {
						element.removeAttribute('disabled')
						element.classList.remove('disabled')
					}
				})
			},
			deactivateButtons() {
				//console.log('deactivateButtons')
				let inputs = document.querySelectorAll('.logged')
				inputs.forEach(function(element) {
					element.setAttribute('disabled', 'disabled')
					element.classList.add('disabled')
				})
			},
			editUser() {
				this.edit = true
			},
			stopEdit() {
				this.edit = false
			},
			saveUser() {
				axios
				.post(apiPath +'edituser/', {
					token: this.$store.getters.getToken,
					username: this.input.username,
					password: this.input.password,
					oldpassword: this.input.oldpassword
				})
				.then((response) => {
					//console.log(response.data)
					this.input.oldpassword = ''
					if (response.data.error) {
						this.errormsg = response.data.error
						this.log("Edit user error: "+ response.data.error, 'error')
					} else {
						this.log("Edit user success")
						if (store.has('users')) {
							let username = CryptoJS.AES.encrypt(response.data.username, "Azimut").toString()
							let password = CryptoJS.AES.encrypt(this.input.password, "Azimut").toString()
							this.updateUserSettings('username', username)
							this.updateUserSettings('password', password)
						}
						store.set('name', response.data.name)
						store.set('username', response.data.username)
						this.errormsg = ''
						this.edit = false
					}
				})
				.catch((error) => {
					this.log("Edit user unsuccessful :( "+ error, 'error')
					this.errormsg = error
				})
			},
			logIn() {
				let data = {
					username: this.input.username,
					password: this.input.password
				}

				console.log('API Path:', apiPath);
				console.log('Data being sent:', data);

				axios
				.post(apiPath +'login/', data)

				.then((response) => {
					console.log(response.data)
					if (response.data.error) {
						this.errormsg = response.data.error
						this.$store.dispatch('updateToken', '')
						this.log("Login unsuccessful :( "+ response.data.error, 'error')
					} else {
						store.set('name', response.data.name)
						store.set('username', response.data.username)
						store.set('levelId', response.data.levelId)
						store.set("loggedTime", new Date())
						store.set("updated", false)
						this.errormsg = ''
						this.$store.dispatch('updateToken', response.data.token)
						this.log("Log in user "+ data.username +" token: "+ response.data.token)
						// controllo aggiornamenti app
						ipcRenderer.send('checkAppUpdates')
						// memorizzo dati accesso
						if (this.input.rememberme) {
							let users = []
							let addToArray = true
							let that = this
							if (store.has('users')) {
								users = JSON.parse(store.get('users'))
								//console.log(users)
								users.forEach(function(user) {
									// aggiorno dati esistenti
									if (CryptoJS.AES.decrypt(user.username, "Azimut").toString(CryptoJS.enc.Utf8) == response.data.username) {
										user.password = CryptoJS.AES.encrypt(that.input.password, "Azimut").toString()
										if (user.screensaverEnabled) {
											store.set('screensaverEnabled', 1)
											that.getScreensavers()
										}
										addToArray = false
										that.log('Update user data: '+ data.username)
										that.log('screensaverEnabled: '+ user.screensaverEnabled)
										return
									}
								})
							}
							// inserisco nuovi dati
							if (addToArray) {
								data.username = CryptoJS.AES.encrypt(data.username, "Azimut").toString()
								data.password = CryptoJS.AES.encrypt(data.password, "Azimut").toString()
								users.push(data)
								this.log('Memorize user data: '+ data.username)
							}
							store.set('users', JSON.stringify(users))
							//console.log(users)
						}
					}
				})
				.catch((error) => {
					this.log("Login call unsuccessful :( "+ error, 'error');
					this.$store.dispatch('updateToken', '')
					this.errormsg = error
				})
			},
			logOut() {
				this.log("Log out "+ this.input.username)
				this.$store.dispatch('logOut')
				//this.logged = false
				this.checked = false
				this.input.username = ''
				this.input.password = ''
				this.input.rememberme = false,
				this.needtoupdate = true
				this.errormsg = ''
			},
			checkUser() {
				this.errormsg = ''
				if (store.has('users')) {
					this.showoptions = true
					let that = this
					let options = []
					let users = JSON.parse(store.get('users'))
					//console.log(users)
					users.forEach(function(user) {
						if (CryptoJS.AES.decrypt(user.username, "Azimut").toString(CryptoJS.enc.Utf8).indexOf(that.input.username) !== -1) {
							options.push(user)
						}
					})
					if (options.length) {
						let userselect = document.getElementById('userselect')
						userselect.innerHTML = '<option>Select user</option>'
						for (let i = 0; i < options.length; i++) {
							var option = document.createElement("option")
							option.text = CryptoJS.AES.decrypt(options[i].username, "Azimut").toString(CryptoJS.enc.Utf8)
							option.value = options[i].password
							userselect.add(option)
						}
						userselect.addEventListener('change', function(event) {
							that.input.username = userselect.options[userselect.selectedIndex].text
							that.input.password = CryptoJS.AES.decrypt(event.target.value, "Azimut").toString(CryptoJS.enc.Utf8)
							that.showoptions = false
							that.input.rememberme = true
							that.log("Get user data from select store: "+ that.input.username)
						})
					} else {
						this.showoptions = false
					}
				}
			},
			resetError() {
				this.errormsg = ''
			},
			startApp() {
				this.log("Start App")
				this.$store.dispatch('startApp')
			}
		},
		components: {
			/*UpIcon, DownIcon,*/ProgressBar  //uncomment to rectivate screensver settings box
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h2 {
		padding-bottom: 0;
	}
	h3 {
		padding: 0;
		font-size: 28px;
	}
	.flex-around {
		align-items: flex-start;
		margin-bottom: 0px;
	}
	.box {
		flex: 0 0 30%;
		width: 30%;
		border: 1px solid #000000;
		border-radius: 0px;
		padding: 15px;
		align-self: flex-start;
	}
	.box-full {
		flex: 0 0 96.5%;
		width: 96.5%;
		border: 1px solid #000000;
		border-radius: 0px;
		padding: 15px;
		margin: 20px 0 40px 0;
		align-self: center;
	}
	.box-full button:not(.disabled) {
		background-color: #614D37;
		color: #fff;
	}
	.label {
		display: inline-block;
		width: 135px;
		text-align: right;
	}
	.input {
		display: inline-block;
		width: 250px;
		margin-left: 8px;
		position: relative;
	}
	#userselect {
		position: absolute;
		top: 20px;
		left: 0;
		width: 250px;
		z-index: 100;
	}
	ul ul {
		font-style: italic;
		padding-left: 20px;
	}
	li {
		list-style-type: none;
		padding: 4px 0;
	}
	.list {
		display: none;
	}
	.list.show {
		display: block;
	}
	.list ul {
		border: 1px solid #000;
		border-radius: 4px;
		display: inline-block;
	}
	.list li {
		padding: 8px 16px;
		border-bottom: 1px solid #000;
	}
	.list li:last-child {
		border-bottom: 0;
	}
	.btn-show {
		cursor: pointer;
    font-size: 1.5em;
    vertical-align: bottom;
	}
	.disabled {
		color: #BCBCBC;
		border-color: #BCBCBC;
	}
	#result-box {
		width: 100%;
		margin: 0;
	}
	#result {
		display: none;
	}
	#result.error, #result.success {
		display: inline-block;
	}
	#progressbar {
		width: 50%;
		margin: 0 auto;
	}
</style>
