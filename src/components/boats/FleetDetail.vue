<template>
  <div id="content" class="boat-detail" v-if="fleetItem">
		
		<BreadCrumbs :boatItem="fleetItem" />
		
		<div v-if="fleetItem.introtext !== ''" class="intro-text text-center" v-html="fleetItem.introtext"></div>
		
		<BoatVideo v-if="fleetItem.video || fleetItem.cover" :video="fleetItem.video" :cover="fleetItem.cover" />
		
		<BoatGallery v-if="fleetItem.interiors || fleetItem.exteriors" :id="id" :boatItem="fleetItem" />

		<BoatSpecsBrief v-if="fleetItem.specifications" :id="id" :boatItem="fleetItem" />
		
		<BoatArrangement v-if="fleetItem.arrangements" :id="id" :boatItem="fleetItem" />
		
  </div>
	
	
</template>

<script>
	import BreadCrumbs from '../boats/BreadCrumbs';
	import BoatGallery from '../boats/BoatGallery';
	import BoatVideo from '../boats/BoatVideo';
	import BoatSpecsBrief from '../boats/BoatSpecsBrief';
	import BoatArrangement from '../boats/BoatArrangement';
	
	export default {
		name: 'FleetDetail',
		props: ['id'],
		computed: {
			fleetItem () {
				let fleetItem = this.$store.getters.fleetItemFromId(this.id);
				return fleetItem
			},
		},
		components: {
			BoatGallery,
			BoatVideo,
			BoatSpecsBrief,
			BoatArrangement,
			BreadCrumbs
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#content {
		padding-top: 130px;
	}
	.intro-text {
		margin: 80px auto;
		width: 50%;
		line-height: 1.5;
	}
</style>
