<template>
	<nav id="boat-nav" v-if="$route.path !== '/' && (specsDocuments || arrangDocuments || otherDocuments)">
		<h1 class="gold uppercase" @click="toggleMenu()">Documents</h1>
		<div class="nav-body">
			<div class="nav-content">
				
				<div class="cat-label gold uppercase">
					Product Specifications
					<img :src="require('../../assets/freccia-gold.svg')" class="arrow" alt=" ">
				</div>
				<ul class="first_level">
					<li v-for="(document, index) in specsDocuments" :key="index" :class="document.folder">
						<a :href="document.src" class="btn btn-doc" @click="toggleMenu()">
							<span>{{ document.caption }}</span>
						</a>
					</li>
				</ul>
				
				<div class="cat-label gold uppercase">
					General Arrangement
					<img :src="require('../../assets/freccia-gold.svg')" class="arrow" alt=" ">
				</div>
				<ul class="first_level">
					<li v-for="(document, index) in arrangDocuments" :key="index" :class="document.folder">
						<a :href="document.src" class="btn btn-doc" @click="toggleMenu()">
							<span>{{ document.caption }}</span>
						</a>
					</li>
				</ul>
				
				<div class="cat-label gold uppercase">
					Other documents
					<img :src="require('../../assets/freccia-gold.svg')" class="arrow" alt=" ">
				</div>
				<ul class="first_level">
					<li v-for="(document, index) in otherDocuments" :key="index" :class="document.folder">
						<a :href="document.src" class="btn btn-doc" @click="toggleMenu()">
							<span>{{ document.caption }}</span>
						</a>
					</li>
				</ul>
				
			</div>
		</div>
	</nav>
</template>

<script>
	export default {
		name: 'DocsNav',
		computed: {
			pageId() {
				let arrPath = this.$route.path.split('/')
				if (arrPath.length < 3) return ''
				return arrPath[2]
			},
			boatItem () {
				let boatItem = this.$store.getters.boatItemFromId(this.pageId);
				return boatItem
			},
			specsDocuments() {
				if (!this.boatItem || !this.boatItem.docs || !this.boatItem.docs.specifications) return null
				return this.boatItem.docs.specifications
			},
			arrangDocuments() {
				if (!this.boatItem || !this.boatItem.docs || !this.boatItem.docs.arrangements) return null
				return this.boatItem.docs.arrangements
			},
			otherDocuments() {
				if (!this.boatItem || !this.boatItem.docs || !this.boatItem.docs.others) return null
				return this.boatItem.docs.others
			}
		},
		methods: {
			toggleMenu() {
				const nav = document.getElementById('boat-nav')
				nav.classList.toggle('active')
			},
		}
	}
</script>

<style scoped>
	.btn-doc {
		display: block;
		padding: 14px 0;
	}
</style>
