<template>
	
	<h2 class="uppercase">Heritage</h2>

	<div class="flex-around">

		<router-link to="/heritage/book" class="btn menu-item">
			<figure>
				<img src="atom://media/heritage/01-copertina.jpg" alt="Heritage Book">
				<figcaption><h3>Heritage Book</h3></figcaption>
			</figure>
		</router-link>

		<button class="btn menu-item" @click="playVideo()">
			<figure>
				<img src="atom://media/heritage/00-video.jpg" alt="Heritage Book">
				<figcaption><h3>150 Years of Benetti</h3></figcaption>
			</figure>
		</button>

	</div>
	
	<teleport to="#teleport">
		<div id="box-video">
			<video id="fullscreen-video" src="atom://media/heritage/video-teaser.mp4" controls loop @error="hideVideo"></video>
			<button class="carousel__button" id="close-video" title="Close" @click="closeVideo()">
				<svg viewBox="0 0 24 24" role="img" tabindex="-1" xmlns="http://www.w3.org/2000/svg"><path d="M20 20L4 4m16 0L4 20"></path></svg>
			</button>
		</div>
	</teleport>

</template>

<script>
	export default {
		name: 'HeritageMenu',
		methods: {
			closeVideo() {
				this.$store.dispatch('closeVideo')
			},
			playVideo() {
				this.$store.dispatch('playVideo')
			},
		},
	}
</script>

<style scoped>
</style>
