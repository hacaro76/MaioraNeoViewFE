<template>
	
	<div id="content">
	
		<div class="action-bar">

			<button v-for="(year, index) in milestones" :key="index" class="btn-gold" @click.prevent="flipToPage(mainpages[index], year)" :id="'btn-page'+ (mainpages[index])">{{ year }}</button>
			
		</div>

		<div class="flipbook">
			<flipbook 
						ref="flipbook" 
						class="box-16by9"
						:pages="pages" 
						:flipDuration="flipDuration" 
						:singlePage="false" 
						@flip-left-start="resetPage"
						@flip-right-start="resetPage"
						@flip-left-end="setPageNum"
						@flip-right-end="setPageNum"
						v-slot="flipbook"
						>
		
				<div id="page-loader" class="page-loader">
					<div class="btn-gold">{{ milestones[0] }}</div>
				</div>

				<div id="media-loader" class="page-loader">

					<div id="media-19" v-if="pageNum == 19" class="video-container">
						<button class="btn-appear" style="top: 467px; left: 791px;" @click="showGallery('1962')">
							<span class="camera">
								<img :src="require('@/assets/camera.svg')" alt="Discover the gallery"> 
							</span>
							Discover the gallery
						</button>
					</div>

					<div id="media-25" v-if="pageNum == 25" class="video-container">
						<button class="btn-appear" style="top: 405px; left: 497px;" @click="showGallery('1967')">
							<span class="camera">
								<img :src="require('@/assets/camera.svg')" alt="Discover the gallery"> 
							</span>
							Discover the gallery
						</button>
					</div>

					<div id="media-27" v-if="pageNum == 27 && showPageVideo" class="video-container">
						<!--<img :class="['videoEnded', (videoEnded) ? '' : 'd-none']" :src="require('@/assets/heritage/page14-endframe.jpg')" style="position: absolute; z-index: 100; width: 542px; height: 307px; top: 74px; left: 151px;">-->
						<video src="atom://media/heritage/media-27-pag_14.mp4" style="width: 542px; height: 307px; top: 74px; left: 151px;"></video>
					</div>

					<div id="media-31" v-if="pageNum == 31 && showPageVideo" class="video-container">
						<video src="atom://media/heritage/media-31-pag_16.mp4" style="width: 325px; height: 183px; top: 392px; left: 840px;"></video>
						<button class="btn-appear" style="top: 320px; left: 840px;" @click="showGallery('1979')">
							<span class="camera">
								<img :src="require('@/assets/camera.svg')" alt="Discover the gallery"> 
							</span>
							Discover the gallery
						</button>
					</div>

					<div id="media-43" v-if="pageNum == 43 && showPageVideo" class="video-container">
						<video src="atom://media/heritage/media-43-pag_22.mp4" style="width: 537px; height: 304px; top: 74px; left: 151px;"></video>
						<button class="btn-appear icon-right" style="top: 405px; left: 497px;" @click="showGallery('1995')">
							Discover the gallery
							<span class="camera">
								<img :src="require('@/assets/camera.svg')" alt="Discover the gallery"> 
							</span>
						</button>
					</div>

					<div id="media-47" v-if="pageNum == 47 && showPageVideo" class="video-container">
						<video src="atom://media/heritage/media-47-pag_24.mp4" style="width: 485px; height: 274px; top: 0px; left: 891px;"></video>
						<button class="btn-appear" style="top: 533px; left: 149px;" @click="showGallery('1998')">
							<span class="camera">
								<img :src="require('@/assets/camera.svg')" alt="Discover the gallery"> 
							</span>
							Discover the gallery
						</button>
						<button class="btn-appear video" style="top: 282px; left: 1327px;" @click="playVideo('1998.mp4')">
							<img :src="require('@/assets/play-black.svg')" alt="Play video">
						</button>
					</div>

					<div id="media-51" v-if="pageNum == 51" class="video-container">
						<button class="btn-appear" style="top: 660px; left: 151px;" @click="showGallery('2000')">
							<span class="camera">
								<img :src="require('@/assets/camera.svg')" alt="Discover the gallery"> 
							</span>
							Discover the gallery
						</button>
					</div>

					<div id="media-53" v-if="pageNum == 53 && showPageVideo" class="video-container">
						<video src="atom://media/heritage/media-53-pag_27.mp4" style="width: 536px; height: 302px; top: 76px; left: 151px;"></video>
						<button class="btn-appear video" style="top: 315px; left: 165px;" @click="playVideo('2002.mp4')">
							<img :src="require('@/assets/play-black.svg')" alt="Play video">
						</button>
					</div>

					<div id="media-59" v-if="pageNum == 59" class="video-container">
						<button class="btn-appear" style="top: 266px; left: 151px;" @click="showGallery('2004')">
							<span class="camera">
								<img :src="require('@/assets/camera.svg')" alt="Discover the gallery"> 
							</span>
							Discover the gallery
						</button>
					</div>

					<div id="media-61" v-if="pageNum == 61 && showPageVideo" class="video-container">
						<video src="atom://media/heritage/media-61-pag_31.mp4" style="width: 414px; height: 308px; top: 474px; left: 961px;"></video>
						<button class="btn-appear" style="top: 735px; left: 151px;" @click="showGallery('2006')">
							<span class="camera">
								<img :src="require('@/assets/camera.svg')" alt="Discover the gallery"> 
							</span>
							Discover the gallery
						</button>
					</div>

					<div id="media-65" v-if="pageNum == 65 && showPageVideo" class="video-container">
						<video src="atom://media/heritage/media-65-pag_33.mp4" style="width: 535px; height: 301px; top: 74px; left: 838px;"></video>
						<button class="btn-appear" style="top: 735px; left: 151px;" @click="showGallery('2011')">
							<span class="camera">
								<img :src="require('@/assets/camera.svg')" alt="Discover the gallery"> 
							</span>
							Discover the gallery
						</button>
					</div>

					<div id="media-67" v-if="pageNum == 67" class="video-container">
						<button class="btn-appear" style="top: 735px; left: 151px;" @click="showGallery('2012')">
							<span class="camera">
								<img :src="require('@/assets/camera.svg')" alt="Discover the gallery"> 
							</span>
							Discover the gallery
						</button>
					</div>

					<div id="media-69" v-if="pageNum == 69 && showPageVideo" class="video-container">
						<video src="atom://media/heritage/media-69-pag_35.mp4" style="width: 536px; height: 304px; top: 74px; left: 840px;"></video>
					</div>

					<div id="media-71" v-if="pageNum == 71 && showPageVideo" class="video-container">
						<video src="atom://media/heritage/media-71-pag_36.mp4" style="width: 535px; height: 302px; top: 75px; left: 840px;"></video>
					</div>

					<div id="media-73" v-if="pageNum == 73" class="video-container">
						<button class="btn-appear icon-right" style="top: 735px; left: 1186px;" @click="showGallery('2016')">
							Discover the gallery
							<span class="camera">
								<img :src="require('@/assets/camera.svg')" alt="Discover the gallery"> 
							</span>
						</button>
					</div>

					<div id="media-75" v-if="pageNum == 75 && showPageVideo" class="video-container">
						<video src="atom://media/heritage/media-75-pag_38.mp4" style="width: 535px; height: 302px; top: 428px; left: 840px;"></video>
						<button class="btn-appear" style="top: 715px; left: 151px;" @click="showGallery('2017')">
							<span class="camera">
								<img :src="require('@/assets/camera.svg')" alt="Discover the gallery"> 
							</span>
							Discover the gallery
						</button>
					</div>

					<div id="media-77" v-if="pageNum == 77 && showPageVideo" class="video-container">
						<video src="atom://media/heritage/media-77-pag_39.mp4" style="width: 536px; height: 301px; top: 75px; left: 840px;"></video>
					</div>

					<div id="media-79" v-if="pageNum == 79 && showPageVideo" class="video-container">
						<video src="atom://media/heritage/media-79-pag_40.mp4" style="width: 535px; height: 301px; top: 481px; left: 840px;"></video>
						<button class="btn-appear icon-right" style="top: 419px; left: 940px;" @click="showGallery('2019-metis')">
							Discover the gallery
							<span class="camera">
								<img :src="require('@/assets/camera.svg')" alt="Discover the gallery"> 
							</span>
						</button>
					</div>

					<div id="media-81" v-if="pageNum == 81 && showPageVideo" class="video-container">
						<video src="atom://media/heritage/media-81-pag_41.mp4" style="width: 1022px; height: 575px; top: 76px; left: 151px;"></video>
						<button class="btn-appear video" style="top: 602px; left: 1185px;" @click="playVideo('2019.mp4')">
							<img :src="require('@/assets/play-black.svg')" alt="Play video">
						</button>
					</div>

					<div id="media-85" v-if="pageNum == 85" class="video-container">
						<button class="btn-appear" style="top: 735px; left: 1186px;" @click="showGallery('2019-giga')">
							<span class="camera">
								<img :src="require('@/assets/camera.svg')" alt="Discover the gallery"> 
							</span>
							Discover the gallery
						</button>
					</div>

					<div id="media-87" v-if="pageNum == 87" class="video-container">
						<button class="btn-appear video" style="top: 739px; left: 138px; width: 68px; height: 68px;" @click="playVideo('2019-giga.mp4')"></button>
					</div>

					<div id="media-89" v-if="pageNum == 89 && showPageVideo" class="video-container">
						<video src="atom://media/heritage/media-89-pag_45.mp4" style="width: 543px; height: 307px; top: 394px; left: 707px;"></video>
						<button class="btn-appear" style="top: 735px; left: 151px;" @click="showGallery('2020')">
							<span class="camera">
								<img :src="require('@/assets/camera.svg')" alt="Discover the gallery"> 
							</span>
							Discover the gallery
						</button>
					</div>

					<div id="media-91" v-if="pageNum == 91 && showPageVideo" class="video-container">
						<video src="atom://media/heritage/media-91-pag_46.mp4" style="width: 536px; height: 300px; top: 78px; left: 151px;"></video>
						<button class="btn-appear" style="top: 735px; left: 151px;" @click="showGallery('2022')">
							<span class="camera">
								<img :src="require('@/assets/camera.svg')" alt="Discover the gallery"> 
							</span>
							Discover the gallery
						</button>
					</div>

					<div id="media-95" v-if="pageNum == 95 && showPageVideo" class="video-container">
						<video src="atom://media/heritage/media-95-pag_48.mp4" style="width: 875px; height: 492px; top: 0px; left: 74px;"></video>
					</div>

				</div>

				<left-icon
					class="btn left"
					:class="{ disabled: !flipbook.canFlipLeft }"
					@click="flipbook.flipLeft"
				/>
				<right-icon
					class="btn right"
					:class="{ disabled: !flipbook.canFlipRight }"
					@click="flipbook.flipRight"
				/>

			</flipbook>
		</div>
	
		<button v-if="scale == 1" id="btn-fullscreen" class="btn" @click="setFlipbookFullscreen" :title="(fullscreen) ? 'Exit fullscreen' : 'Enter fullscreen'">
			<fullscreen v-if="!fullscreen" />
			<fullscreen-exit v-if="fullscreen" />
		</button>
	</div>
	
	<div v-if="showExternalVideo">
		<teleport to="#teleport">
			<div id="box-video">
				<video id="fullscreen-video" controls loop></video>
				<button class="carousel__button" id="close-video" title="Close" @click="closeVideo()">
					<svg viewBox="0 0 24 24" role="img" tabindex="-1" xmlns="http://www.w3.org/2000/svg"><path d="M20 20L4 4m16 0L4 20"></path></svg>
				</button>
			</div>
		</teleport>
	</div>
	
</template>

<script>
	import Flipbook from 'flipbook-vue'
	import 'vue-material-design-icons/styles.css'
	import LeftIcon from 'vue-material-design-icons/ChevronLeftCircle'
	import RightIcon from 'vue-material-design-icons/ChevronRightCircle'
	import Fullscreen from 'vue-material-design-icons/Fullscreen'
	import FullscreenExit from 'vue-material-design-icons/FullscreenExit'
	//import PlusIcon from 'vue-material-design-icons/MagnifyPlusOutline'
	//import MinusIcon from 'vue-material-design-icons/MagnifyMinusOutline'
	
	import Galleries from '@/assets/heritage/galleries.json';
	
	import { Fancybox } from "@fancyapps/ui";
	import "@fancyapps/ui/dist/fancybox/fancybox.css";
	
	Fancybox.bind("[data-fancybox]", {
		// Your options go here
	});

	export default {
		name: 'HeritagePage',
		data() {
      return {
				publicPath: process.env.BASE_URL,
				showPageVideo: true,
				videoEnded: false,
				fullscreen: false,
				flipbook: null,
				pages: [],
				galleries: Galleries,
				hasMouse: true,
				pageNum: 1,
				currentYear: '',
				flipDuration: 1000,
				orig_w: 1525,
				win_w: 1525,
				/*orig_w: 1376,
				win_w: 1376,*/
				scale: 1,
				milestones: ['1873', '1890', '1921', '1941', '1962', '1966', '1967', '1977', '1979', '1983', '1985', '1989', '1995', '1998', '2000', '2002', '2003', '2004', '2006', '2011', '2012', '2015', '2016', '2017', '2018', '2019', '2020', '2022', '2023'],
				mainpages: ['7', '9', '13', '15', '19', '21', '25', '27', '31', '35', '39', '41', '43', '47', '51', '53', '57', '59', '61', '65', '67', '69', '71', '75', '77', '79', '89', '91', '95'],
				milestonesindex: 0
			}
		},
		computed: {
			showExternalVideo() {
				switch(this.pageNum) {
					case 47:
					case 53:
					case 81:
					case 87:
						return true
					default:
						return false
				}
			},
		},
		mounted() {
			this.flipbook = this.$refs.flipbook
			let page = document.getElementById('media-loader')
			this.win_w = page.clientWidth
			console.log('win_w', this.win_w)
			
			// scalo elementi in proporzione
			let scale = this.scale = this.win_w / this.orig_w
			console.log('scale', this.scale)

			const btns = document.querySelectorAll('button.btn-gold')
			btns.forEach(function(element) {
				element.style.zoom = scale
			})
			
			// Workaround for touch screen
			let start = null;
			window.addEventListener('touchstart', (ev) => {
				start = ev.changedTouches[0];
			});
			window.addEventListener('touchend', (ev) => {
				if (!this.flipbook) return
				let end = ev.changedTouches[0];
				if (end.screenX - start.screenX > 0) {
					console.log('swipe right');
					if (this.flipbook.canFlipLeft) this.flipbook.flipLeft()
				} else if (end.screenX - start.screenX < 0) {
					if (this.flipbook.canFlipRight) this.flipbook.flipRight()
					console.log('swipe left');
				}
			});

			window.addEventListener('keydown', (ev) => {
				if (!this.flipbook) return
				if (ev.keyCode == 37 && this.flipbook.canFlipLeft) this.flipbook.flipLeft()
				if (ev.keyCode == 39 && this.flipbook.canFlipRight) this.flipbook.flipRight()
			})
			
			// Simulate asynchronous pages initialization
			setTimeout(() => {
				this.pages = [
					"atom://media/heritage/page01-L.jpg", "atom://media/heritage/page01-R.jpg", 
					"atom://media/heritage/page02-L.jpg", "atom://media/heritage/page02-R.jpg", 
					"atom://media/heritage/page03-L.jpg", "atom://media/heritage/page03-R.jpg", 
					"atom://media/heritage/page04-L.jpg", "atom://media/heritage/page04-R.jpg", 
					"atom://media/heritage/page05-L.jpg", "atom://media/heritage/page05-R.jpg", 
					"atom://media/heritage/page06-L.jpg", "atom://media/heritage/page06-R.jpg", 
					"atom://media/heritage/page07-L.jpg", "atom://media/heritage/page07-R.jpg", 
					"atom://media/heritage/page08-L.jpg", "atom://media/heritage/page08-R.jpg", 
					"atom://media/heritage/page09-L.jpg", "atom://media/heritage/page09-R.jpg", 
					"atom://media/heritage/page10-L.jpg", "atom://media/heritage/page10-R.jpg", 
					"atom://media/heritage/page11-L.jpg", "atom://media/heritage/page11-R.jpg", 
					"atom://media/heritage/page12-L.jpg", "atom://media/heritage/page12-R.jpg", 
					"atom://media/heritage/page13-L.jpg", "atom://media/heritage/page13-R.jpg", 
					"atom://media/heritage/page14-L.jpg", "atom://media/heritage/page14-R.jpg", 
					"atom://media/heritage/page15-L.jpg", "atom://media/heritage/page15-R.jpg", 
					"atom://media/heritage/page16-L.jpg", "atom://media/heritage/page16-R.jpg", 
					"atom://media/heritage/page17-L.jpg", "atom://media/heritage/page17-R.jpg", 
					"atom://media/heritage/page18-L.jpg", "atom://media/heritage/page18-R.jpg", 
					"atom://media/heritage/page19-L.jpg", "atom://media/heritage/page19-R.jpg", 
					"atom://media/heritage/page20-L.jpg", "atom://media/heritage/page20-R.jpg", 
					"atom://media/heritage/page21-L.jpg", "atom://media/heritage/page21-R.jpg", 
					"atom://media/heritage/page22-L.jpg", "atom://media/heritage/page22-R.jpg", 
					"atom://media/heritage/page23-L.jpg", "atom://media/heritage/page23-R.jpg", 
					"atom://media/heritage/page24-L.jpg", "atom://media/heritage/page24-R.jpg", 
					"atom://media/heritage/page25-L.jpg", "atom://media/heritage/page25-R.jpg", 
					"atom://media/heritage/page26-L.jpg", "atom://media/heritage/page26-R.jpg", 
					"atom://media/heritage/page27-L.jpg", "atom://media/heritage/page27-R.jpg", 
					"atom://media/heritage/page28-L.jpg", "atom://media/heritage/page28-R.jpg", 
					"atom://media/heritage/page29-L.jpg", "atom://media/heritage/page29-R.jpg", 
					"atom://media/heritage/page30-L.jpg", "atom://media/heritage/page30-R.jpg", 
					"atom://media/heritage/page31-L.jpg", "atom://media/heritage/page31-R.jpg", 
					"atom://media/heritage/page32-L.jpg", "atom://media/heritage/page32-R.jpg", 
					"atom://media/heritage/page33-L.jpg", "atom://media/heritage/page33-R.jpg", 
					"atom://media/heritage/page34-L.jpg", "atom://media/heritage/page34-R.jpg", 
					"atom://media/heritage/page35-L.jpg", "atom://media/heritage/page35-R.jpg", 
					"atom://media/heritage/page36-L.jpg", "atom://media/heritage/page36-R.jpg", 
					"atom://media/heritage/page37-L.jpg", "atom://media/heritage/page37-R.jpg", 
					"atom://media/heritage/page38-L.jpg", "atom://media/heritage/page38-R.jpg", 
					"atom://media/heritage/page39-L.jpg", "atom://media/heritage/page39-R.jpg", 
					"atom://media/heritage/page40-L.jpg", "atom://media/heritage/page40-R.jpg", 
					"atom://media/heritage/page41-L.jpg", "atom://media/heritage/page41-R.jpg", 
					"atom://media/heritage/page42-L.jpg", "atom://media/heritage/page42-R.jpg", 
					"atom://media/heritage/page43-L.jpg", "atom://media/heritage/page43-R.jpg", 
					"atom://media/heritage/page44-L.jpg", "atom://media/heritage/page44-R.jpg", 
					"atom://media/heritage/page45-L.jpg", "atom://media/heritage/page45-R.jpg", 
					"atom://media/heritage/page46-L.jpg", "atom://media/heritage/page46-R.jpg", 
					"atom://media/heritage/page47-L.jpg", "atom://media/heritage/page47-R.jpg", 
					"atom://media/heritage/page48-L.jpg", "atom://media/heritage/page48-R.jpg", 
					"atom://media/heritage/page49-L.jpg", "atom://media/heritage/page49-R.jpg", 
				]
			}, 1)

			this.setPageNum()
			
			//this.exportJson()
			
		},
		methods: {
			/*exportJson() {
				const configurations = require.context('@/assets/heritage/galleries/', true);
				let arr = []
				let index = -1
				let activeYear = ''
				configurations.keys().forEach(filename => {
					//console.log(filename);
					let src = filename.substr(2)
					let year = src.substr(0, 4)
					if (src.substr(0, 9) == '2019-giga') year = '2019-giga'
					if (src.substr(0, 10) == '2019-metis') year = '2019-metis'
					// nuovo anno
					if (year !== activeYear) {
						arr.push({ "year": year, "gallery": [] })
						index++
						activeYear = year
					}
					let caption = ''
					switch(year) {
						case '1962':
							caption = '1962 - Delfino 18M'
							break
						case '1967':
							caption = '1967 - Mediterraneo 33M'
							break
						case '1979':
							caption = '1979 - M/Y Nabila'
							break
						case '1995':
							caption = '1995 - Golden Bay Series'
							break
						case '1998':
							caption = '1998 - Classic 115'
							break
						case '2000':
							caption = '2000 - M/Y Reverie 70M'
							break
						case '2004':
							caption = '2004 - M/Y Sai Ram 52M'
							break
						case '2006':
							caption = '2006 - M/Y Ambrosia III 65M'
							break
						case '2011':
							caption = '2011 - M/Y Nataly 65M'
							break
						case '2012':
							caption = '2012 - M/Y Diamonds 60M'
							break
						case '2016':
							caption = '2016 - Gigayachts'
							break
						case '2017':
							caption = '2017 - M/Y Seasense 67M'
							break
						case '2019-metis':
							caption = '2019 - M/Y Metis 63M'
							break
						case '2019-giga':
							caption = '2019 - The Giga-season'
							break
						case '2020':
							caption = '2020 - Oasis Deck &amp;copy;'
							break
						case '2022':
							caption = '2022 - B.Yond 37M'
							break
					}
					//console.log('year: '+ year +' path: '+ src +' caption: '+ caption)
					arr[index].gallery.push({ "src": 'atom://media/heritage/galleries/'+ src, "thumb": 'atom://media/heritage/galleries/'+ src, "caption": caption })
				});

				console.log(arr)

				const data = JSON.stringify(arr)
				const blob = new Blob([data], {type: 'text/plain'})
				const e = document.createEvent('MouseEvents'),
				a = document.createElement('a');
				a.download = "galleries.json";
				a.href = window.URL.createObjectURL(blob);
				a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
				e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				a.dispatchEvent(e);
			},*/
			resetPage() {
				//console.log('resetPage')
				const targets = document.querySelectorAll('.btn-target')
				targets.forEach(function(element) {
					element.classList.remove('show')
				})
				const buttons = document.querySelectorAll('.btn-appear')
				buttons.forEach(function(element) {
					element.classList.remove('show')
					//element.classList.add('d-none')
				})
				let video = document.querySelector('video')
				if (video) {
					video.pause()
					this.videoEnded = true
					video.classList.remove('show')
					this.showPageVideo = false
				}
			},
			getSize(size) {
				let rapporto = this.orig_w / this.win_w;
				size = size / rapporto;
				return Number(size).toFixed(2);
			},
			resizeElement(el) {
				if (el.style.top) {
					let top = el.style.top.replace('px', '')
					let newtop = this.getSize(Number(top)) +'px'
					el.style.top = newtop
				}
				if (el.style.left) {
					let left = el.style.left.replace('px', '')
					let newleft = this.getSize(Number(left)) +'px'
					el.style.left = newleft
				}
				if (el.style.width) {
					let width = el.style.width.replace('px', '')
					let newwidth = this.getSize(Number(width)) +'px'
					el.style.width = newwidth
				}
				if (el.style.height) {
					let height = el.style.height.replace('px', '')
					let newheight = this.getSize(Number(height)) +'px'
					el.style.height = newheight
				}
			},
			showAddons() {
				let that = this
				this.videoEnded = false
				// ridimensiono e mostro contenuti aggiuntivi
				const pagetargets = document.querySelectorAll('#media-'+ this.pageNum +' .btn-target')
				//console.log('#media-'+ this.pageNum +' .btn-target', pagetargets.length)
				if (pagetargets.length) {
					pagetargets.forEach(function(element) {
						that.resizeElement(element)
						element.classList.add('show')
					})
				}
				const buttons = document.querySelectorAll('.btn-appear')
				buttons.forEach(function(element) {
					that.resizeElement(element)
					if (that.fullscreen) {
						element.classList.add('fullscreen-margins')
					}
					element.classList.add('show')
				})
				const pagevideos = document.querySelectorAll('#media-'+ this.pageNum +' video')
				//console.log('#media-'+ this.pageNum +' video', pagevideos.length)
				if (pagevideos.length) {
					pagevideos.forEach(function(element) {
						that.resizeElement(element)
						if (that.fullscreen) {
							element.classList.add('fullscreen-margins')
						}
						element.classList.add('show')
						element.play()
						element.addEventListener('ended', function() {
							that.videoEnded = true
						})
					})
				}
				/*const covervideo = document.querySelectorAll('.videoEnded')
				//console.log('#media-'+ this.pageNum +' .btn-target', pagetargets.length)
				if (covervideo.length) {
					covervideo.forEach(function(element) {
						that.resizeElement(element)
					})
				}*/
			},
			setPageNum(timeout) {
				this.showPageVideo = true
				let pageNum = this.flipbook.page
				this.pageNum = pageNum
				console.log('pageNum', pageNum)
				if (!timeout) timeout = 600
				setTimeout(this.showAddons, timeout)
				// aggiorno stato pulsanti
				let btn = document.getElementById('btn-page'+ pageNum)
				//console.log('#btn-page'+ pageNum +' exists', btn)
				if (!btn) return false
				//console.log('Update active btn', '#btn-page'+ pageNum)
				const btns = document.querySelectorAll('.btn-gold')
				/*btns.classList.remove('gold')*/
				btns.forEach(function(element) {
					element.classList.remove('gold')
				})
				btn.classList.add('gold')
				// aggiorno anno in page-loader
				this.milestonesindex = this.milestones.indexOf(this.currentYear)
				console.log('setPageNum => year', this.currentYear)
				console.log('setPageNum => milestonesindex', this.milestonesindex)
				let loader = document.querySelector('#page-loader .btn-gold')
				loader.innerHTML = this.currentYear
			},
			flipToPage(page, year) { // not index mode
				/*console.log('*** flipToPage ***')
				console.log('currentPage', this.flipbook.page)
				console.log('goto page', page)
				console.log('year', year)*/
				this.resetPage()
				this.currentYear = year
				
				const flipbookContainer = document.querySelector('.flipbook-container')
				flipbookContainer.classList.add('hide')
				
				// year countdown
				let avanza = page > this.flipbook.page ? true : false
				let loader = document.querySelector('#page-loader')
				loader.classList.add('show')
				this.flipbook.goToPage(page)
				
				let loadertext = document.querySelector('#page-loader .btn-gold')
				loadertext.style.zoom = this.scale
				//const targets = document.querySelectorAll('.target')
				let milestonesindex = this.milestonesindex
				let newindex = this.milestones.indexOf(year)
				//console.log('new index', newindex)
				//this.setPageNum(1200)

				let interval = setInterval(() => {
					//console.log('milestonesindex', milestonesindex)
					//console.log('new year', this.milestones[milestonesindex])
					loadertext.innerHTML = this.milestones[milestonesindex]
					if (avanza) {
						milestonesindex++
						if (milestonesindex > newindex) {
							clearInterval(interval)
							//this.flipbook.goToPage(page)
							flipbookContainer.classList.remove('hide')
							loader.classList.remove('show')
							//console.log('*** setPageNum from flipToPage ***')
							this.setPageNum()
						}
					} else {
						milestonesindex--
						if (milestonesindex < newindex) {
							clearInterval(interval)
							//this.flipbook.goToPage(page)
							flipbookContainer.classList.remove('hide')
							loader.classList.remove('show')
							//console.log('*** setPageNum from flipToPage ***')
							this.setPageNum()
						}
					}
				}, 100);

			},
			showGallery(year) {
				//console.log(year)
				let gallery = this.galleries.find((item) => item.year == year)
				if (!gallery) return false
				Fancybox.show(gallery.gallery)
			},
			closeVideo() {
				this.$store.dispatch('closeVideo')
			},
			playVideo(path) {
				const src = 'atom://media/heritage/'+ path
				//console.log(src)
				let video = document.getElementById("fullscreen-video")
				video.setAttribute('src', src)
				this.$store.dispatch('playVideo')
			},
			setFlipbookFullscreen() {
				let flipbook = document.querySelector(".flipbook")
				let btnFullscreen = document.getElementById("btn-fullscreen")
				const buttons = document.querySelectorAll('.btn-appear')
				const pagevideos = document.querySelectorAll('#media-'+ this.pageNum +' video')
				if (this.fullscreen) {
					flipbook.classList.remove('fullscreen')
					btnFullscreen.classList.remove('fullscreen')
					this.fullscreen = false
				} else {
					flipbook.classList.add('fullscreen')
					btnFullscreen.classList.add('fullscreen')
					this.fullscreen = true
				}
				let that = this
				buttons.forEach(function(element) {
					if (that.fullscreen) {
						element.classList.add('fullscreen-margins')
					} else {
						element.classList.remove('fullscreen-margins')
					}
				})
				pagevideos.forEach(function(element) {
					if (that.fullscreen) {
						element.classList.add('fullscreen-margins')
					} else {
						element.classList.remove('fullscreen-margins')
					}
				})
				//console.log('#media-'+ this.pageNum +' video', pagevideos.length)
			}
		},
		components: {
			Flipbook, LeftIcon, RightIcon, Fullscreen, FullscreenExit
		},
	}
</script>

<style scoped>
	#content {
		padding-bottom: 0;
	}
	
	.flipbook {
		width: 82%;
    margin: 30px auto 0px auto;
		position: relative;
	}
	
	.action-bar {
		width: 100%;
		margin: 20px 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.btn {
		font-size: 36px;
		color: #666;
	}

	.btn svg {
		bottom: 0;
	}

	.btn:not(:last-child) {
		margin-left: 10px;
	}

	.has-mouse .btn:hover {
		color: #ccc;
		filter: drop-shadow(1px 1px 5px #000);
		cursor: pointer;
	}

	.btn:active {
		filter: none !important;
	}

	.flipbook .btn.disabled {
		color: #999;
		pointer-events: none;
	}

	.flipbook .left {
		position: absolute;
		left: -120px;
		top: 0;
		font-size: 48px;
		z-index: 1003;
	}
	.flipbook .right {
		position: absolute;
		right: -120px;
		left: auto;
		top: 0;
		font-size: 48px;
		z-index: 1003;
	}
	
	/* fullscreen styles */

	.flipbook.fullscreen {
		/*width: 100%;
    top: 113px;
    left: 204px; */
		transform: scale(1.22) !important;
		position: absolute;
    top: 96px;
    left: 170px;
    margin: 0;
    background-color: #fff;
    z-index: 1002;
	}
	
	.flipbook.fullscreen .left {
		left: 20px;
	}
	.flipbook.fullscreen .right {
		right: 20px;
	}
	
	.fullscreen-margins {
    margin-left: 30px;
    margin-top: 13px;
	}
	
	#btn-fullscreen {
		position: absolute;
		bottom: -44px;
		right: 10px;
		z-index: 1003;
		font-size: 48px;
	}

	#btn-fullscreen.fullscreen {
		bottom: auto;
		top: 1018px;
	}

	.btn-gold {
		border-radius: 50%;
		font-family: "GT-Super-Display-Light", Helvetica, Arial, "sans-serif";
    height: 54px;
    width: 54px;
    min-width: 54px;
    text-align: center;
    padding: 0;
		margin-right: 10px;
    font-size: 20px;
		font-weight: bolder;
		display: inline-block;
	}
	
	.btn-black {
		border-radius: 50%;
		font-family: "GT-Super-Display-Light", Helvetica, Arial, "sans-serif";
    height: 30px;
    width: 30px;
    min-width: 30px;
    text-align: center;
    padding: 0;
    font-size: 20px;
		font-weight: bolder;
		display: inline-block;
		background-color: #000;
    color: #FFF;
    line-height: 26px;
    border: 1px solid #fff;
	}
	
	/*.box-16by9 {
		padding-top: 62.5%;
		box-shadow: 1px 1px 4px rgba(0, 0, 0, .65);
	}*/

	/* navigazione tra pagine */
	.page-loader {
    /*width: 1530px;
    height: 860px;*/
		width: 100%;
    margin: 0px auto;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1000;
	}
	
	#page-loader {
		background-color: #FFF;
		text-align: center;
		opacity: 0;
		display: none;
		transition: opacity 0.5s ease;
		-webkit-transition: opacity 0.5s ease;
	}
	
	#page-loader.show {
		opacity: 1;
		display: block;
		box-shadow: 4px 4px 14px 0px rgba(0, 0, 0, .65);
	}
	
	#page-loader .btn-gold {
    height: 750px;
    width: 750px;
    padding: 0;
		margin-right: 0;
		margin-top: 55px;
    font-size: 265px;
		line-height: 705px;
	}
	
	/* media nelle slides */
	.video-container {
    height: 100%;
    width: 100%;
	}
	
	.video-container > * {
    max-width: 100%;
	}
	
	.video-container video {
		position: absolute;
		opacity: 0;
		display: none;
		/*transition: opacity 1.5s ease;
		-webkit-transition: opacity 1.5s ease;*/
	}
	
	.video-container video.show {
		opacity: 1;
		display: block;
	}
	
	.btn-appear {
		position: absolute;
		height: 48px;
		border: 0;
		background-color: transparent;
		cursor: pointer;
		font-family: "Fakt Pro Medium", Helvetica, Arial, "sans-serif";
		font-size: 11px;
		text-transform: uppercase;
		color: darkgray;
		opacity: 0;
		transition: opacity 0.5s ease;
		-webkit-transition: opacity 0.5s ease;
	}
	
	.btn-appear .camera {
		width: 48px;
		height: 48px;
		border: 2px solid #000;
    border-radius: 50%;
		margin-right: 8px;
		display: inline-block;
	}
	
	.btn-appear.icon-right .camera {
		margin-right: 0px;
		margin-left: 8px;
	}
	
	.btn-appear .camera img {
		vertical-align: middle;
		margin: 11px 8px;
	}
	
	.btn-appear.video {
		width: 48px;
	}
	
	.btn-appear.show {
		opacity: 1;
	}
	
	.btn-target {
		/*font-size: 3.5em;
    color: #000;
    stroke: #fff;
    stroke-width: 0.4px;*/
    height: 30px;
    width: 30px;
		margin-left: 0;
		position: absolute;
		opacity: 0;
		display: none;
		transition: opacity 1.5s ease;
		-webkit-transition: opacity 1.5s ease;
	}
	
	.btn-target.show {
		opacity: 1;
		display: block;
	}
	
	.btn-target > svg {
		stroke: #bf9f57;
	}
	
</style>
