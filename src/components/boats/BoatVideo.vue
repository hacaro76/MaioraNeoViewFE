<template>
	
	<div class="video-preview text-center">
		<div class="box-16by9">
			<div :style="'background-image: url('+ cover +')'"></div>
		</div>
		<div v-if="video" class="play-video">
			<img :src="require('../../assets/play-white.svg')" alt="Play video" @click="playVideo()">
		</div>
	</div>

	<div v-if="video">
		<teleport to="#teleport">
			<div id="box-video">
				<video id="fullscreen-video" controls loop></video>
				<button class="carousel__button" id="close-video" title="Close" @click="closeVideo()">
					<svg tabindex="-1" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m19.5 4.5-15 15M4.5 4.5l15 15"></path></svg>
				</button>
			</div>
		</teleport>
	</div>
	
</template>

<script>
	export default {
		name: 'BoatVideo',
		props: ['video', 'cover'],
		methods: {
			closeVideo() {
				this.$store.dispatch('closeVideo')
			},
			playVideo() {
				let video = document.getElementById("fullscreen-video")
				video.setAttribute('src', this.video)
				this.$store.dispatch('playVideo')
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.video-preview {
		width: 80%;
		margin: 40px 10%;
		transition: opacity 1.5s ease;
		transition-delay: 0s;
		transition-delay: 0.5s;
		position: relative;
	}
</style>
