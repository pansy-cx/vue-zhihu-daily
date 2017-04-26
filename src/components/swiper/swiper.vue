<template>
	<div class="swiper" ref="swiper" id="swiper">
		<div class="swiper-top">
			<div class="bg" ref="bg" v-show="!this.sidebar"></div>
			<i class="icon iconfont icon-lisimoshicaidandaohang" @click.stop="sidebarShow"></i>
			<span v-html="dateFormat(title)"></span>
		</div>
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="item in topStories" :style="imgWeserv(item.image)">
					<router-link :to="'/article/'+item.id" class="swiper-mask"></router-link>
					<h3>{{item.title}}</h3>
				</div>
			</div>
			<div class="swiper-pagination"></div>
		</div>
	</div>
</template>

<script>
	import '../../../static/js/swiper-3.4.2.min.js';
	export default {
		props: {
			title: {
				type: String,
				default: '今日新闻'
			},
			sidebar: {
				type: Boolean
			}
		},
		data() {
			return {
				topStories: {},
				sidebarDate: false,
				scrollTop: 0
			}
		},
		created() {
			this.$http.get('api/4/news/latest').then(response => {
        let data = response.body;
        this.topStories = data.top_stories;
      },response => {
        console.log('err');
      });
		},
		mounted() {
			new window.Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 0,
        centeredSlides: true,
        autoplay: 4000,
        autoplayDisableOnInteraction: false,
        observer: true,
        lazyLoading: true,
        resistanceRatio: 0
      });
      window.addEventListener('scroll', this.show, false);
		},
		methods: {
      imgWeserv($url) {
        let url =  $url.replace(/https?:\/\/p/g,'https://images.weserv.nl/?url=p');
        // return url;
        return "backgroundImage: url('" + url + "')";
      },
      show() {
      	let swiper = this.$refs.swiper;
      	let bg = this.$refs.bg;
      	if(!swiper) return;
      	bg.style.transform = 'translate3d(0,0px,0)';
    		bg.style.opacity = 0;
      	if(window.document.body.scrollTop < swiper.clientHeight) {
      		let h = window.document.body.scrollTop/swiper.clientHeight * 40;
      		bg.style.transform = 'translate3d(0,' + h + 'px,0)';

      		let opacity = window.document.body.scrollTop/swiper.clientHeight * 100;
      		bg.style.opacity = opacity / 100;
      	}else {
      		bg.style.transform = 'translate3d(0,40px,0)';
      		bg.style.opacity = 1;
      	}
      },
      sidebarShow() {
      	this.sidebarDate = true;
      	let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      	this.$set(this,'scrollTop',scrollTop);
      	document.body.classList.add('dialog-open');
      	document.body.style.top = -this.scrollTop + 'px';
      	this.$emit('sidebarShow');
      }
    }
	}
</script>

<style lang="scss">
	@import './swiper.scss';
</style>