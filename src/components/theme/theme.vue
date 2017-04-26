<template>
	<div class="theme">
		<div class="theme-top">
			<div class="bg" :style="imgWeserv(this.bg)"></div>
			<div class="wrapper">
				<span @click="sidebarShow"><i class="iconfont icon-left"></i></span>
				<span>{{this.name}}</span>
				<span><i class="iconfont icon-plus1"></i></span>
			</div>
		</div>
		<div class="theme-editor">
			<span>主编</span>
			<span class="avatar" :style="imgWeserv(this.avatar)"></span>
			<span><i class="iconfont icon-right"></i></span>
		</div>
		<ul class="theme-content">
			<li v-for="item in this.stories">
				<router-link v-bind:to="{ name: 'themearticle',params: { id:item.id } }">
					<p :class="{haveimg: item.images}">{{item.title}}</p>
					<div class="img" v-if="item.images" :style="imgWeserv(item.images[0])"></div>
				</router-link>
			</li>
		</ul>
		<v-sidebar v-show="sidebarDate" v-on:sidebarHide="sidebarHide" :scrollTop="scrollTop" :idactive="this.id"></v-sidebar>
		<router-view></router-view>
	</div>
</template>

<script>
	import sidebar from '../sidebar/sidebar.vue';
	export default {
		data() {
			return {
				id: 0,
				name: '',
				bg: '',
				avatar: '',
				stories: {},
				sidebarDate: false,
				scrollTop: 0
			}
		},
		created() {
			let url = window.location.href;
			this.id = parseInt(url.match(/\d+$/g));
			this.getDate(this.id);
		},
		beforeRouteEnter(to, from , next) {
			document.getElementById('content').style.display = 'none';
			document.getElementById('swiper').style.display = 'none';
			next();
		},
		beforeRouteLeave(to,from,next) {
			document.getElementById('content').style.display = 'block';
			document.getElementById('swiper').style.display = 'block';
			next();
		},
		watch: {
			'$route': 'fetchData'
		},
		methods: {
			getDate(id) {
				this.$http.get('api/4/theme/' + id).then(response => {
	        let data = response.body;
	        this.name = data.name;
	        this.bg = data.background;
	        if(data.editors[0]) {
	        this.avatar = data.editors[0].avatar;
	        }
	        this.stories = data.stories;
	      },response => {
	        console.log('err');
	      });
			},
			imgWeserv($url) {
        let url =  $url.replace(/https?:\/\/p/g,'https://images.weserv.nl/?url=p');
        return "backgroundImage: url('" + url + "')";
      },
      sidebarShow() {
        this.sidebarDate = true;
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      	this.$set(this,'scrollTop',scrollTop);
      	document.body.classList.add('dialog-open');
      	document.body.style.top = -this.scrollTop + 'px';
      },
      sidebarHide() {
        this.sidebarDate = false;
      },
      fetchData() {
      	let id = this.$route.params.id;
      	this.getDate(id);
      }
		},
		components: {
			'v-sidebar': sidebar
		}
	}
</script>

<style lang="scss">
	@import './theme.scss';
</style>