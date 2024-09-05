<template>
	
	<div v-if="lineBoats">
		<div class="cat-label gold uppercase">
			{{ title }}
			<img :src="require('../../assets/freccia-gold.svg')" class="arrow" :alt="title">
		</div>
		<div class="first_level">
			<DropdownItem v-for="(boatList, index) in lineBoats" v-bind:key="index" :page="page" :boatList="boatList" />
		</div>
	</div>
	
</template>

<script>
	import DropdownItem from '../layout/DropdownItem';
	
	export default {
		name: 'DropdownMenu',
		props: ['page', 'title', 'lineBoats'],
		components: {
			DropdownItem
		},
	}
</script>

<style scoped>
</style>
