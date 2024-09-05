<template>
	<!--<header :class="($route.path === '/') ? 'active' : ''" :class="($route.path == '/settings') ? 'd-none' : ''">-->
	<header>
		<router-link to="/" v-on:dblclick="updateFiles"><img :src="require('../../assets/logo/abyachts-logo-black.svg')" alt="Logo AB" id="logo"></router-link>
	</header>
	
	<nav id="secondary-nav">
		<!--<h1 class="gold uppercase" v-if="($route.path == '/' || $route.path == '/heritage/book')">
			<router-link to="/heritage" class="btn btn-page">Heritage</router-link>
		</h1>-->
		<router-link to="/settings" class="btn btn-page" v-if="($route.path == '/')" @click="pauseapp">
			<cog-outline class="icon-settings"></cog-outline>
		</router-link>
		<button id="close-app" class="btn" v-if="($route.path == '/settings')" @click="closeapp">
			<close class="icon-settings"></close>
		</button>
	</nav>
	
	<div id="updating" class="d-none">
		<img :src="require('../../assets/ajax-loader.gif')" alt="Copying files" width="31" height="31">
		<div class="my-2">
			<label for="download-progress">
				<span id="download-label">Downloading progress:</span> 
				<span id="label-progress">calculating, wait please!</span>
			</label> 
			<br>
			<progress id="download-progress" value="0" max="100"></progress>
		</div>
		<button id="reload" class="btn btn-gold" @click="reloadPage"><i class="bi bi-repeat me-2"></i> Reload page</button>
	</div>
</template>

<script>
	import 'vue-material-design-icons/styles.css'
	import CogOutline from 'vue-material-design-icons/CogOutline'
	import Close from 'vue-material-design-icons/Close'

	export default {
		name: 'PageHeader',
		methods: {
			closeapp() {
				window.close()
			},
			pauseapp() {
				this.$store.dispatch('pausedApp')
			},
			updateFiles() {
				if (this.$store.getters.isOffline) return false
				console.log("updateFiles from Home page")
				this.$store.dispatch('getBoatItems', false)
			},
			reloadPage() {
				this.$store.dispatch('reloadPage')
			}
		},
		components: {
			CogOutline, Close
		}
	}
</script>

<style>
	#logo {
		width: 180px;
	}
	#secondary-nav {
		right: 0;
		left: auto;
		height: 73px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.icon-settings {
		font-size: 32px;
		margin-right: 20px;
		top: -4px;
		opacity: 0.25;
	}
	#updating {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: rgba(255,255,255,.75);
		z-index: 1010;
	}
</style>
