<template>
	
	<button :class="['btn btn-dropdown', (activePage) ? 'gold' : '']" :id="'btn-submenu-'+ mainItem.id_boat" :data-target="'submenu-'+ mainItem.id_boat">
		<figure>
			<img :src="mainItem.profile" :alt="mainItemName">
			<figcaption>{{ mainItemName }}</figcaption>
		</figure>
	</button>
	<div :class="['dropdown', (activePage) ? 'show' : '']" :id="'submenu-'+ mainItem.id_boat">
		<MenuItemSubmenu v-for="boatItem in boatList" v-bind:key="boatItem.id" :page="page" :boatItem="boatItem" />
	</div>
	
</template>

<script>
	import MenuItemSubmenu from '../layout/MenuItemSubmenu';

	export default {
		name: 'DropdownButton',
		props: ['page', 'boatList'],
		computed: {
			mainItem () {
				return this.boatList[0]
			},
			mainItemName () {
				let name = this.mainItem.name
				if (this.mainItem.variant) name = name.replace(' '+ this.mainItem.variant, '')
				return name
			},
			activePage() {
				if (!this.page) return false
				let nameLenght = this.mainItem.name.length
				let alias = this.mainItem.id.substr(0, nameLenght)
				let mainPage = this.page.substr(0, nameLenght)
				if (alias == mainPage) {
					/*console.log('mainPage', mainPage)
					console.log('alias', alias)*/
					return true
				}
				return false
			}
		},
		components: {
			MenuItemSubmenu
		},
	}
</script>

<style scoped>
</style>
