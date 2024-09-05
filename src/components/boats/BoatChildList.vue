<template>
	
	<div v-if="childBoats" id="childBoats" class="sezione">
		
		<h2 class="uppercase">Special Hulls</h2>

		<div class="child-list">

			<router-link v-for="childBoat in childBoats" :key="childBoat.id" :to="'/yachts/'+ childBoat.id" class="btn menu-item" @click="bindResetPage">
				<div class="box-16by9">
					<div :style="'background-image: url('+ childBoat.image +')'"></div>
				</div>
				<figcaption><h3>{{childBoat.name}}</h3></figcaption>
			</router-link>

		</div>
  </div>
</template>

<script>
	export default {
		name: 'BoatChildList',
		props: ['childBoats'],
		methods: {
			bindResetPage() {
				window.scrollTo({ top: 0, behavior: 'smooth' })
				this.$store.dispatch("resetArrangements")
			}
		}
	}
</script>

<style scoped>
	.child-list {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: 40px 20px;
	}
	.menu-item {
		flex-grow: 1;
		max-width: 33.333%;
	}
	.menu-item img {
		opacity: 1;
		transition: opacity 0.5s ease;
		-webkit-transition: opacity 0.5s ease;
		max-width: 100%;
	}
	.menu-item img:hover {
		opacity: 0.5;
		cursor: zoom-in;
	}
	.menu-item figcaption {
		padding: 12px 0;
		text-align: center;
		text-transform: uppercase;
	}
</style>
