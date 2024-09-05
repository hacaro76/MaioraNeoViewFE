<template>
	
	<div v-if="boatList.length == 1 && boatList[0].parentId == 0">
		<MenuItem :page="page" :boatItem="boatList[0]" :type="'yachts'" />
	</div>
	
	<div v-if="boatList.length > 1 && boatList[0].parentId == 0">
		<DropdownButton :page="page" :boatList="boatList" />
	</div>

	<div v-if="boatList[0].parentId == undefined">
		<MenuItem v-for="(boatItem, index) in boatList" v-bind:key="index" :page="page" :boatItem="boatItem" :type="'fleets'" />
	</div>
	
</template>

<script>
	import DropdownButton from '../layout/DropdownButton';
	import MenuItem from '../layout/MenuItem';

	export default {
		name: 'DropdownItem',
		props: ['page', 'boatList'],
		components: {
			DropdownButton,
			MenuItem
		},
	}
</script>

<style scoped>
</style>
