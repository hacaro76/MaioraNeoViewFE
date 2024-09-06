<template>
    <div id="content" class="text-center homepage">

        <h1 class="my-6">
            The Pleasure<br>of Life on Board
        </h1>

        <div class="video-preview text-center">
            <img id="hp-img" :src="require('../assets/Maiora-lifestyle_Philosophy.jpg')" alt="Benetti Yacht" data-fancybox>
        </div>
			
    </div>

</template>

<script>
	import { Fancybox } from "@fancyapps/ui";
	import "@fancyapps/ui/dist/fancybox/fancybox.css";
	
	Fancybox.bind("[data-fancybox]", {
		// Your options go here
	});

	export default {
		name: 'HomePage',
		mounted() {
			this.$store.dispatch('startedApp')
			this.$store.dispatch('getScreensavers')
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	body {
			overflow: hidden !important;
	}
	#hp-img {
		max-height: calc(100vh * 0.7);
	}
</style>
