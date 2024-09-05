<template>
	<div id="box-screensaver" :class="(start) ? 'show' : ''">
		<video id="screensaver-video">
			<source src="" type="video/mp4">
		</video>
	</div>
</template>

<script>
	const Store = window.require('electron-store');
	const store = new Store();
	
	let timeoutInterval = 0;

	export default {
		name: 'ScreenSaver',
		data () {
			return {
				start: false,
				interval: 0,
				index: 0,
				screensaverTimeout: 0,
				activeScreensaver: ''
			}
		},
		computed: {
			screensavers() {
				return this.$store.getters.screensavers
			},
			isStarted() {
				return this.$store.getters.isStarted
			},
			isVideoPlaying() {
				return this.$store.getters.isVideoPlaying
			},
			timeout() {
				// va memorizzato nello store per captare il click sulla pagina!!!
				return this.$store.getters.timeout
			},
		},
		watch: {
			screensavers() {
				let screensavers = this.$store.getters.screensavers
				//console.log("WATCH screensavers")
				if (screensavers) this.checkScreensaver()
				return screensavers
			},
			isStarted() {
				return this.$store.getters.isStarted
			}
		},
		methods: {
			checkScreensaver() {
				this.screensaverTimeout = (store.has("screensaverTimeout")) ? store.get("screensaverTimeout") : 0
				console.log('screensaverTimeout: '+ this.screensaverTimeout)
				if (this.screensaverTimeout == 0) return false
				this.interval = this.screensaverTimeout * 6 * 1000
				console.log('screensaver lenght: '+ this.screensavers.length)
				console.log('interval: '+ this.interval)
				console.log('isStarted: '+ this.isStarted)
				if (this.screensavers.length && this.isStarted) {
					console.log('Start timeout screensaver - interval: '+ this.interval)
					timeoutInterval = setTimeout(this.startTimeout, 1000)
				}
			},
			startTimeout() {
				clearTimeout(timeoutInterval)
				if (!this.isStarted) return false
				var timeout = this.timeout + 1000
				if (this.isVideoPlaying) timeout = 0
				//console.log('timeout: '+ timeout +' interval: '+ this.interval +' video started: '+ this.isVideoPlaying)
				this.$store.dispatch('setTimeout', timeout)
				if (this.timeout == this.interval) {
					if (!this.screensavers[this.index]) this.index = 0
					this.activeScreensaver = this.screensavers[this.index].path
					console.log('Start activeScreensaver: '+ this.activeScreensaver +' index: '+ this.index)
					this.playVideo()
					this.index++
					if (this.index >= this.screensavers.length) this.index = 0
					this.start = true
				} else {
					timeoutInterval = setTimeout(this.startTimeout, 1000)
				}
			},
			closeVideo() {
				let video = document.getElementById("screensaver-video")
				video.pause()
				this.start = false
				video.currentTime = 0
				this.$store.dispatch('setTimeout', 0)
				document.body.style.overflowY = 'auto'
				timeoutInterval = setTimeout(this.startTimeout, 1000)
			},
			playVideo() {
				document.body.style.overflowY = 'hidden'
				let video = document.getElementById("screensaver-video")
				video.setAttribute('src', this.activeScreensaver)
				let videodiv = document.getElementById("box-screensaver")
				videodiv.classList.add('show')
				video.play()
				video.addEventListener("ended", () => {
					this.closeVideo()
				}, false)
				video.addEventListener("click", () => {
					this.closeVideo()
				}, false)
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#box-screensaver {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		transition: opacity 1.5s ease;
		-webkit-transition: opacity 1.5s ease;
		opacity: 0;
		background-color: #000;
		z-index: auto;
	}
	#box-screensaver.show {
		opacity: 1;
		display: block;
		z-index: 1020;
	}
	#screensaver-video {
		width: 100%;
		height: 100vh;
	}
</style>
