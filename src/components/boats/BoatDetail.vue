<template>
  <div id="content" class="boat-detail" v-if="boatItem">
		
		<BreadCrumbs :boatItem="boatItem" :otherDocuments="otherDocuments" :parentItem="parentItem" />
		
		<div v-if="boatItem.introtext !== ''" class="intro-text text-center" v-html="boatItem.introtext"></div>
		
		<BoatVideo v-if="boatItem.video" :video="boatItem.video" :cover="boatItem.cover" />
		
		<BoatGallery v-if="boatItem.interiors || boatItem.exteriors" :id="id" :boatItem="boatItem" />

		<BoatSpecsBrief v-if="boatItem.specifications" :id="id" :boatItem="boatItem" :documents="specsDocuments" />
		
		<BoatArrangement v-if="boatItem.arrangements" :id="id" :boatItem="boatItem" :documents="arrangDocuments" />
		
		<BoatAddons v-if="otherDocuments" :id="id" :boatItem="boatItem" :documents="otherDocuments" />
		
		<BoatChildList v-if="boatItem.childBoats" :childBoats="boatItem.childBoats" />
		
  </div>
	
	
</template>

<script>
	import BreadCrumbs from '../boats/BreadCrumbs';
	import BoatGallery from '../boats/BoatGallery';
	import BoatVideo from '../boats/BoatVideo';
	import BoatSpecsBrief from '../boats/BoatSpecsBrief';
	import BoatArrangement from '../boats/BoatArrangement';
	import BoatAddons from '../boats/BoatAddons';
	import BoatChildList from '../boats/BoatChildList';
	
	/*const Store = window.require('electron-store');
	const store = new Store();*/
	
	export default {
		name: 'BoatDetail',
		props: ['id'],
		data() {
      return {
				documents: this.$store.getters.documents
			}
		},
		computed: {
			boatItem () {
				let boatItem = this.$store.getters.boatItemFromId(this.id);
				return boatItem
			},
			parentItem () {
				if (this.boatItem.parentId == 0) return null
				let parentItem = this.$store.getters.boatItemFromIdBoat(this.boatItem.parentId);
				return parentItem
			},
			specsDocuments() {
				if (!this.boatItem.docs || !this.boatItem.docs.specifications) return null
				return this.boatItem.docs.specifications
			},
			arrangDocuments() {
				if (!this.boatItem.docs || !this.boatItem.docs.arrangements) return null
				return this.boatItem.docs.arrangements
			},
			otherDocuments() {
				if (!this.boatItem.docs || !this.boatItem.docs.others) return null
				return this.boatItem.docs.others
			}
		},
		components: {
			BoatGallery,
			BoatVideo,
			BoatSpecsBrief,
			BoatArrangement,
			BoatAddons,
			BoatChildList,
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
