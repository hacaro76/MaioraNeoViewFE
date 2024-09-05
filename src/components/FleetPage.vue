<template>
	<div id="content" v-if="fleetItems">
		
		<h1>Fleets</h1>
		
		<div class="fleet-list">
			<div v-for="(fleetItem, index) in fleetItems" :key="index" class="menu-item">

				<button v-if="fleetItem.gallery" class="btn btn-fleet" @click="openGallery(fleetItem.id)">
					<div class="box-16by9">
						<div :style="'background-image: url('+ fleetItem.gallery[0].src +')'"></div>
					</div>
					<figcaption><h3>{{fleetItem.name}}</h3></figcaption>
				</button>

			</div>
		</div>
	</div>
</template>

<script>
	import { Fancybox } from "@fancyapps/ui";
	import "@fancyapps/ui/dist/fancybox.css";
	
	export default {
		name: 'FleetPage',
		computed: {
			fleetItems () {
				return this.$store.getters.fleetItems;
			},
		},
		methods: {
			openGallery(id) {
				let fleet = this.$store.getters.fleetItemFromId(id)
				if (!fleet) return false
				Fancybox.show(fleet.gallery);
			},
		},
	}
</script>

<style scoped>
	#content {
		padding-top: 130px;
	}
	.fleet-list {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: 40px 20px;
	}
	.menu-item {
		flex-grow: 1;
		max-width: 33.333%;
		text-align: center;
	}
	.btn-fleet {
		width: 90%;
		margin: 0 auto;
		opacity: 1;
		transition: opacity 0.5s ease;
		-webkit-transition: opacity 0.5s ease;
		max-width: 100%;
	}
	.btn-fleet:hover {
		opacity: 0.5;
		cursor: zoom-in;
	}
	.menu-item figcaption {
		padding: 12px 0;
		text-align: center;
		text-transform: uppercase;
	}
</style>
