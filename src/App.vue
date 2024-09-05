<template>
	<PageHeader />
	
	<PageNav />
	
	<DocsNav />
	
	<router-view/>
	
	<ScreenSaver />
</template>

<script>
	import PageHeader from './components/layout/PageHeader';
	import PageNav from './components/layout/PageNav';
	import DocsNav from './components/layout/DocsNav';
	import ScreenSaver from './components/ScreenSaver';

	export default {
		name: 'App',
		data () {
			return {
				id: this.$route.params.id
			}
		},
		beforeCreate() {
			let logged = this.$store.getters.checkLogged
			if (!logged) return false
			this.$store.dispatch('getOfflineBoatItems')
		},
		created() {
			this.id = this.$route.params.id
		},
		mounted() {
			document.addEventListener("click", () => {
				this.$store.dispatch('resetTimeout')
			})
		},
		components: {
			PageHeader,
			PageNav,
			DocsNav,
			ScreenSaver
		}
	}
</script>

<style>
</style>
