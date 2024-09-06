<template>
  <div id="general-arrangement" class="sezione text-center">
		
    <h2 class="uppercase">General Arrangement</h2>
		
		<div id="arrangement-layout">
			
			<div id="previews">
				
				<a class="preview-img toright active" @click="replaceImg">
					<figure>
						<figcaption>Profile</figcaption>
						<img :src="require('../../assets/profile.png')" :data-img="getItem('profile')" alt="Profile">
					</figure>
				</a>
				
				<a class="preview-img toleft" v-if="getItem('top')" @click="replaceImg">
					<figure>
						<figcaption>Nest	</figcaption>
						<img :src="require('../../assets/profile-maindeck.png')" :data-img="getItem('top')" alt="Flybridge">
					</figure>
				</a>
				
				<a class="preview-img" v-if="getItem('sundeck')" @click="replaceImg">
					<figure>
						<figcaption>Sundeck</figcaption>
						<img :src="require('../../assets/profile-sundeck.png')" :data-img="getItem('sundeck')" alt="Sundeck">
					</figure>
				</a>
				
				<a class="preview-img" v-if="getItem('bridgedeck')" @click="replaceImg">
					<figure>
						<figcaption>Bridgedeck</figcaption>
						<img :src="require('../../assets/profile-bridgedeck.png')" :data-img="getItem('bridgedeck')" alt="Sundeck">
					</figure>
				</a>
				
				<a class="preview-img" v-if="getItem('upperdeck')" @click="replaceImg">
					<figure>
						<figcaption>Upperdeck</figcaption>
						<img :src="require('../../assets/profile-upperdeck.png')" :data-img="getItem('upperdeck')" alt="Upperdeck">
					</figure>
				</a>
				
				<a class="preview-img toleft" v-if="getItem('maindeck')" @click="replaceImg">
					<figure>
						<figcaption>Maindeck</figcaption>
						<img :src="require('../../assets/profile-maindeck.png')" :data-img="getItem('maindeck')" alt="Maindeck">
					</figure>
				</a>
				
				<a class="preview-img toleft" v-if="getItem('lowerdeck')" @click="replaceImg">
					<figure>
						<figcaption>Lowerdeck</figcaption>
						<img :src="require('../../assets/profile-lowerdeck.png')" :data-img="getItem('lowerdeck')" alt="Lowerdeck">
					</figure>
				</a>
				
				<a class="preview-img toleft" v-if="getItem('underlowerdeck')" @click="replaceImg">
					<figure>
						<figcaption>Underlowerdeck</figcaption>
						<img :src="require('../../assets/profile-underlowerdeck.png')" :data-img="getItem('underlowerdeck')" alt="Underlowerdeck">
					</figure>
				</a>
				
			</div>
			
			<div id="layout">
				<a id="img-fancybox" :href="getItem('profile')" ref="imgFancybox" data-fancybox>
					<img id="img-layout" :src="getItem('profile')" alt="Profile" :style="top" ref="imgLayout" @load="calcTop()">
				</a>
			</div>
			
		</div>
		
		<BoatDocs v-if="documents" :documents="documents" />
		
  </div>
	
</template>

<script>
	import BoatDocs from '../boats/BoatDocs';
	import { Fancybox } from "@fancyapps/ui";
	import "@fancyapps/ui/dist/fancybox/fancybox.css";

	Fancybox.bind("[data-fancybox]", {
		// Your options go here
	});

	export default {
		name: 'BoatArrangement',
		props: ['id', 'boatItem', 'documents'],
		data() {
      return {
				top: 0
			}
		},
		/*mounted() {
			this.calcTop();
		},
		updated() {
			this.calcTop();
		},*/
		methods: {
			getItem(id) {
				let item = this.boatItem.arrangements.find((item) => item.id === id)
				return (item) ? item.image : false
			},
			calcTop() {
				const h = this.$refs.imgLayout.clientHeight
				const fancyh = this.$refs.imgFancybox.clientHeight
				//console.log('h: '+ h +'px - fancyh: '+ fancyh +'px')
				let top = (Number(fancyh) - h) / 2
				//console.log('top: '+ top +'px;')
				this.top = 'top: '+ top +'px;'
			},
			replaceImg(ev) {
				// resetto stato pulsanti
				const buttons = document.querySelectorAll('.preview-img')
				buttons.forEach(function(button) {
					button.classList.remove('active')
				})
				const previewimg = document.getElementById('img-layout')
				const fancyboxanchor = document.getElementById('img-fancybox')
				const button = ev.target.closest('a')
				const img = button.querySelectorAll('img')[0].getAttribute('data-img');
				//console.log('clicked - img: '+ img)
				button.classList.add('active');
				previewimg.setAttribute('src', img)
				fancyboxanchor.setAttribute('href', img)
			}
		},
		components: {
			BoatDocs
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#arrangement-layout {
		display: flex;
		align-items: center;
	}
	#previews {
		width: 280px;
	}
	.preview-img {
		margin-bottom: 18px;
		cursor: pointer;
		position: relative;
		display: inline-block;
		background-color: #ccc;
	}
	.preview-img:last-child {
		margin-bottom: 0;
	}
	.preview-img.active {
		background-color: #000;
	}
	.preview-img figure {
		margin: 0;
		padding: 0;
	}
	.preview-img figcaption {
		position: absolute;
		bottom: 12px;
		left: 0;
		width: 100%;
		text-align: left;
		padding-left: 74px;
		text-transform: uppercase;
	}
	.preview-img.toleft figcaption {
		padding-left: 30px;
	}
	.preview-img.toright figcaption {
		padding-left: 87px;
	}
	.preview-img.active figcaption {
		color: #000;
	}
	.preview-img img {
		width: 240px;
		max-width: none;
		display: block;
	}
	#layout {
		display: flex;
		align-self: flex-start;
		cursor: zoom-in;
	}
	#img-fancybox {
		max-height: 600px;
		overflow: hidden;
		position: relative;
	}
	#img-layout {
		max-width: 100%;
		position: relative;
	}
</style>
