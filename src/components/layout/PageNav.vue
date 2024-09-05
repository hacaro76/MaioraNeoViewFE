<template>
	
	<nav id="yachts-nav" :class="($route.path == '/settings') ? 'd-none' : 'left-nav'">
		<h1 class="gold uppercase btn-link" @click="openMenu('#yachts-nav')">Yachts</h1>
		<div class="nav-body">
			<div class="nav-content" v-if="boatItems">
				
				<DropdownMenu v-for="(boatItemLine, key) in boatItems" v-bind:key="key" :page="page" :title="boatItemLine.name" :lineBoats="boatItemLine.boats" />
				
			</div>
		</div>
	</nav>
	
	<nav v-if="fleetItems && fleetItems.length" id="fleets-nav" :class="($route.path == '/settings') ? 'd-none' : 'left-nav'">
		<h1 class="gold uppercase btn-link" @click="openMenu('#fleets-nav')" id="fleets-h1">Fleets</h1>
		<div class="nav-body">
			<div class="nav-content">
				
				<DropdownMenu v-for="(fleetItemYear, key) in fleetItems" v-bind:key="key" :page="page" :title="fleetItemYear.period" :lineBoats="fleetItemYear.boats" />
				
			</div>
		</div>
	</nav>
	
</template>

<script>
	
	import DropdownMenu from '../layout/DropdownMenu';
	import router from '../../router'
	
	export default {
		name: 'PageNav',
		props: ['id'],
		computed: {
			boatItems () {
				return this.$store.getters.boatItems;
			},
			fleetItems () {
				return null
				//return this.$store.getters.fleetItems;
			},
			page() {
				return router.currentRoute.value.path.substr(1)
			}
		},
		updated() {
			this.bindButtons();
			this.bindDropdowns();
			/*console.log('BIND MENU ACTIONS')*/
		},
		methods: {
			toggleMenu(navName, show) {
				const header = document.querySelector('header')
				const nav = document.querySelector(navName)
				const content = document.querySelector('#content')
				if (show) {
					header.classList.add('active');
					nav.classList.add('active');
					if (content) content.classList.add('active');
				} else {
					header.classList.remove('active');
					nav.classList.remove('active');
					if (content) content.classList.remove('active');
				}
			},
			openMenu(navName) {
				const nav = document.querySelector(navName)
				var show = (nav.classList.contains('active')) ? false : true;
				this.resetNav()
				this.toggleMenu(navName, show)
			},
			resetNav() {
				const activenav = document.querySelector('nav.active')
				if (activenav) activenav.classList.remove('active')
				const header = document.querySelector('header')
				header.classList.remove('active');
				const content = document.querySelector('#content')
				if (content) content.classList.remove('active')
			},
			bindButtons() {
				const Buttons = document.querySelectorAll('.btn-page')
				const that = this
				Buttons.forEach(function(element) {
					element.addEventListener('click', () => {
						if (element.parentElement && !element.parentElement.classList.contains('dropdown')) that.resetDropdowns()
						that.resetNav()
						window.scrollTo({ top: 0, behavior: 'smooth' })
						that.$store.dispatch("resetArrangements")
					})
				})
			},
			resetDropdowns() {
				//console.log('resetDropdowns')
				document.querySelectorAll('.dropdown').forEach(function(dropdown) {
					dropdown.classList.remove('show')
				})
				document.querySelectorAll('.btn-dropdown').forEach(function(button) {
					button.classList.remove('gold');
				})
			},
			bindDropdowns() {
				const navDropdowns = document.querySelectorAll('.btn-dropdown')
				const that = this
				navDropdowns.forEach(function(element) {
					element.addEventListener('click', () => {
						that.resetDropdowns()
						var targetEl = element.getAttribute('data-target');
						var target = document.getElementById(targetEl);
						var show = (target.classList.contains('show')) ? false : true;
						//console.log('clicked '+ targetEl +' show: '+ show)
						if (show) {
							target.classList.add('show');
							element.classList.add('gold');
						}
					})
				})
			},
		},
		components: {
			DropdownMenu
		}
	}
</script>

<style scoped>
	.btn-page {
		display: block;
	}
</style>
