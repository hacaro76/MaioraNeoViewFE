<template>
	
	<div id="photo-gallery" class="sezione">
		
		<h2 class="uppercase">Photo Gallery</h2>

		<div v-if="boatItem" class="flex-around">

			<button v-if="boatItem.exteriors && boatItem.exteriors.length" class="btn menu-item" @click="openGalleryExt()">
				<div class="box-16by9">
					<div :style="'background-image: url('+ boatItem.exteriors[0].src +')'"></div>
				</div>
				<figcaption><h3>{{boatItem.name}} Exteriors</h3></figcaption>
			</button>

			<button v-if="boatItem.interiors && boatItem.interiors.length" class="btn menu-item" @click="openGalleryInt()">
				<div class="box-16by9">
					<div :style="'background-image: url('+ boatItem.interiors[0].src +')'"></div>
				</div>
				<figcaption><h3>{{boatItem.name}} Interiors</h3></figcaption>
			</button>

		</div>
		
		<div class="text-center">
			<button v-if="boatItem.vr && !isOffline" class="btn-gold gold" id="btn-vr" @click="openVr">
				<panorama-variant-outline></panorama-variant-outline>
				Navigate Yacht
			</button>
		</div>
		
  </div>
	
</template>

<script>
	import 'vue-material-design-icons/styles.css'
	import PanoramaVariantOutline from 'vue-material-design-icons/PanoramaVariantOutline'
	
	import { Fancybox } from "@fancyapps/ui";
	import "@fancyapps/ui/dist/fancybox/fancybox.css";
	
	const isDevelopment = process.env.NODE_ENV !== 'production'
	
	export default {
		name: 'BoatGallery',
		props: ['id', 'boatItem'],
		data () {
			return {
				isOffline: this.$store.getters.isOffline
			}
		},
		computed: {
			iframeSrc() {
				let returnPath = this.boatItem.vr
				if (returnPath.indexOf('https') !== -1) return returnPath
				if (isDevelopment) {
					return 'http://127.0.0.1:8888/ABNeoView/'+ returnPath
				} else {
					return 'https://fixlife.it/ABNeoView/'+ returnPath
				}
			}
		},
		methods: {
			openGalleryInt() {
				Fancybox.show(this.boatItem.interiors);
			},
			openGalleryExt() {
				Fancybox.show(this.boatItem.exteriors);
			},
			openVr() {
				Fancybox.show([
					{
						src: this.iframeSrc,
						type: "iframe",
						preload: true,
						width: 1600,
						height: 900,
						iframeAttr: {
							allow: "autoplay;accelerometer;gyroscope;magnetometer;fullscreen;vr;wake-lock;xr-spatial-tracking;"
						}
					},
				]);
			}
		},
		components: {
			PanoramaVariantOutline
		}
	}
</script>

<style scoped>
	#btn-vr {
		font-family: "Roboto Regular", Helvetica, Arial, "sans-serif";
		padding-top: 12px;
	}
	#btn-vr span {
		font-size: 30px;
    vertical-align: sub;
    margin-right: 8px;
		height: auto;
	}
</style>
