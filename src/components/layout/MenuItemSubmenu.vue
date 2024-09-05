<template>
	
	<router-link v-if="boatItem.parentId == 0" :to="'/yachts/'+ boatItem.id" :class="['btn btn-page', (page && page == boatItem.id) ? 'gold' : '']">
		<img :src="require('../../assets/freccia-gold.svg')" class="arrow" alt=" ">
		{{ boatItem.variant }}
	</router-link>
	
</template>

<script>
	export default {
		name: 'MenuItemSubmenu',
		props: ['page', 'boatItem'],
	}
</script>

<style scoped>
</style>
