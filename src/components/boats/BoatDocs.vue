<template>
	<div v-if="documents" class="box-download">

		<a :href="document.src" v-for="(document, index) in documents" :key="index" class="btn-gold btn-download">
			<span>{{ document.caption }}</span>
		</a>

	</div>
</template>

<script>
	export default {
		name: 'BoatDocs',
		inheritAttrs: false,
		props: ['documents']
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
