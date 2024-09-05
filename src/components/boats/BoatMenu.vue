<template>
  <div class="boat-menu" v-if="boatItem">
				
		<button class="menu-item" data-fancybox="dialog" data-src="#product-specifications">
			Specifications
		</button>
		
		<button class="menu-item" data-fancybox="" data-type="pdf" :href="(boatItem.pdf) ? boatItem.pdf : 'cataloghi/Motopanfilo_37m_Benetti.pdf'">
			Catalogue
		</button>
		
		<button class="menu-item" @click="openGallery">
			Gallery
		</button>
		
		<button class="menu-item" data-fancybox="video-gallery" :href="(boatItem.video) ? boatItem.video : 'video/Benetti_B-Now-63M.mp4'" data-width="1920" data-height="1080">
			Video
		</button>
		
  </div>
</template>

<script>
	import { Fancybox } from "@fancyapps/ui";
	import "@fancyapps/ui/dist/fancybox.css";
	
	var gallery = [
		{
			src: require("../../assets/galleries/test/BNOW50_V5_POPPA-OASIS_B_21042022.jpg"),
			thumb: require("../../assets/galleries/test/BNOW50_V5_POPPA-OASIS_B_21042022.jpg"),
			caption: "First image",
		},
		{
			src: require("../../assets/galleries/test/BN6B99_1-WEB.jpg"),
			thumb: require("../../assets/galleries/test/BN6B99_1-WEB.jpg"),
			caption: "Second image",
		},
		{
			src: require("../../assets/galleries/test/BNOW50_POPPA_OASIS_V2_b_DETTAGLIO0137.jpg"),
			thumb: require("../../assets/galleries/test/BNOW50_POPPA_OASIS_V2_b_DETTAGLIO0137.jpg"),
			caption: "Third image",
		},
	];

	export default {
		name: 'BoatMenu',
		props: ['id', 'boatItem'],
		data () {
			return {
				publicPath: process.env.BASE_URL
			}
		},
		methods: {
			openGallery() {
				if (this.boatItem.gallery) {
					Fancybox.show(this.boatItem.gallery);
				} else {
					Fancybox.show(gallery);
				}
			},
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.boat-menu {
  display: flex;
	justify-content: space-around;
	align-items: center;
	margin: 40px 20px;
}
.menu-item {
  flex-grow: 1;
	max-width: 25%;
  margin: 0 10px;
	height: 50px;
}
</style>
