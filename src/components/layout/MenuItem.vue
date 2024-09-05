<template>
	
	<router-link :to="linkPath" :class="['btn btn-page', (page && page == boatItem.id) ? 'gold' : '', (type == 'fleets') ? 'my-1' : '']">
		<figure>
			<img :src="boatItem.profile" :alt="boatItem.name">
			<figcaption>{{ boatItem.name }}</figcaption>
		</figure>
	</router-link>

</template>

<script>
	export default {
		name: 'MenuItem',
		props: ['page', 'boatItem', 'type'],
		computed: {
			linkPath() {
				return '/'+ this.type +'/'+ this.boatItem.id
			},
		},
	}
</script>

<style scoped>
</style>
