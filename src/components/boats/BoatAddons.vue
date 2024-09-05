<template>
	<div v-if="documents" id="product-documents" class="sezione background-gold top-gold bottom-gold">
		<h2>Other documents</h2>

		<BoatDocs :documents="documents" />
		
	</div>
		
</template>

<script>
	import BoatDocs from '../boats/BoatDocs';
	
	export default {
		name: 'BoatAddons',
		inheritAttrs: false,
		props: ['id', 'boatItem', 'documents'],
		components: {
			BoatDocs
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
