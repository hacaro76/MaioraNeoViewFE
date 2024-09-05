<template>
  <div v-if="boatItem" id="breadcrumbs">
		
		<div class="box-download">

			<router-link to="/" class="btn btn-breadcrumbs">
				<span>Home</span> &gt;
			</router-link>

			<router-link v-if="parentItem" :to="'/'+ parentItem.id" data-sez="breadcrumbs" class="btn btn-breadcrumbs btn-smooth" @click="smoothScroll">
				<span>{{ fullParentName }}</span> &gt;
			</router-link>

			<div class="btn-breadcrumbs active">
				[ <span>{{ fullName }}</span> ]
				<span>&gt;</span>
			</div>

			<button v-if="boatItem.interiors || boatItem.exteriors" data-sez="photo-gallery" class="btn btn-breadcrumbs btn-smooth" @click="smoothScroll">
				Photo Gallery <span>|</span>
			</button>

			<button v-if="boatItem.specifications" data-sez="product-specifications" class="btn btn-breadcrumbs btn-smooth" @click="smoothScroll">
				Product Specifications <span>|</span>
			</button>

			<button v-if="boatItem.arrangements" data-sez="general-arrangement" class="btn btn-breadcrumbs btn-smooth" @click="smoothScroll">
				General Arrangement <span v-if="(otherDocuments && otherDocuments.length) || boatItem.childBoats">|</span>
			</button>

			<button v-if="otherDocuments && otherDocuments.length" data-sez="product-documents" class="btn btn-breadcrumbs btn-smooth" @click="smoothScroll">
				Documents <span v-if="boatItem.childBoats">|</span>
			</button>

			<button v-if="boatItem.childBoats" data-sez="childBoats" class="btn btn-breadcrumbs btn-smooth" @click="smoothScroll">
				Special Hulls
			</button>

			<teleport to="#teleport">
				<button data-sez="content" id="btn-top" class="btn btn-top btn-smooth gold uppercase" :style="{ backgroundImage: 'url(' + require('@/assets/top-scroll.svg') + ')' }" @click="smoothScroll"></button>
			</teleport>

		</div>
		
  </div>
</template>

<script>
	window.addEventListener('scroll', () => {
		const btnTop = document.getElementById('btn-top')
		if (!btnTop) return false
		let scroll = window.pageYOffset
		if (scroll > 200) {
			btnTop.classList.add('scrolling')
		} else {
			btnTop.classList.remove('scrolling')
		}
	})
	
	export default {
		name: 'BreadCrumbs',
		props: ['boatItem', 'parentItem', 'otherDocuments'],
		data() {
      return {
				isOffline: this.$store.getters.isOffline
			}
		},
		computed: {
			fullName() {
				if (this.boatItem.variantId && this.boatItem.variantId !== 0) return this.boatItem.name +' '+ this.boatItem.variant
				return this.boatItem.name
			},
			fullParentName() {
				if (!this.parentItem) return ''
				if (this.parentItem.variantId !== 0) return this.parentItem.name +' '+ this.parentItem.variant
				return this.parentItem.name
			},
		},
		methods: {
			smoothScroll(event) {
				let button = event.target
				const id = button.getAttribute('data-sez');
				const yOffset = -173; 
				const element = document.getElementById(id);
				let y = 0;
				if (element) y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
				window.scrollTo({top: y, behavior: 'smooth'});
			},
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	#breadcrumbs {
		position: fixed;
		top: 73px;
		left: 0;
		width: 100%;
		background-color: #FFF;
		z-index: 2;
	}
	#btn-top {
		position: fixed;
		bottom: 30px;
		right: 30px;
		width: 30px;
		height: 30px;
		display: inline-block;
		background-size: cover;
		background-position: 0 0;
		opacity: 0;
		transition: opacity 0.5s ease;
	}
	#btn-top.scrolling {
		opacity: 1;
	}
	#btn-top:hover {
		background-position: 0 30px;
	}
</style>
