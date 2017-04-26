<template>
	<transition name="fade">
	<div class="sidebar" ref="sideBar">
		<div class="sidebar-wrapper">
			<div class="sidebar-user" ref="sidebarUser">
				<img src="../../assets/images/user.jpg">
				<span>陈曦</span>
			</div>
			<div class="sidebar-setting" ref="sidebarSetting">
				<i class="iconfont icon-star"><span>收藏</span></i>
				<i class="iconfont icon-xiaoxi"><span>消息</span></i>
				<i class="iconfont icon-setting"><span>设置</span></i>
			</div>
			<div class="sidebar-content">
				<ul ref="scrollUl">
					<li :class="{active: indexactive}">
						<router-link v-bind:to="{ name: 'index' }" v-if="indexactive">
							<i class="iconfont icon-Home"></i>
							<span>首页</span>
							<i class="icon iconfont icon-plus"></i>
						</router-link>
						<div @click="returnIndex" v-else>
							<router-link v-bind:to="{ name: 'index' }">
								<i class="iconfont icon-Home"></i>
								<span>首页</span>
								<i class="icon iconfont icon-plus"></i>
							</router-link>
						</div>
					</li>
					<li v-for="item in list" @click="sidebarHide" :class="{active: idactive == item.id}">
						<router-link class="sidelink" v-bind:to="{ name: 'theme',params: { id:item.id } }">
							<span>{{item.name}}</span>
							<i class="icon iconfont icon-plus"></i>
						</router-link>
					</li>
				</ul>
			</div>
			<div class="sidebar-bottom" ref="sidebarBottom">
				<i class="iconfont icon-download">  下载</i>
				<i class="iconfont icon-siglyphmoonstar">  夜间</i>
			</div>
		</div>
		<div class="sidebar-mask" @click.stop.prevent="sidebarHide"></div>
	</div>
	</transition>
</template>

<script>
	export default {
		props: {
			sidebar: {
				type: Boolean
			},
			indexactive: {
				type: Boolean
			},
			idactive: {
				type: Number
			}
		},
		data() {
			return {
				list: {},
				start: 0,
				translateY: 0,
				sidebarDate: false,
        scrollTop: 0
			}
		},
		created() {
			this.getList();
			this.$nextTick(() => {
				let scroll = this.$refs.scrollUl;
				scroll.addEventListener('touchstart', this._start, false);
				scroll.addEventListener('touchmove', this._move, false);
				scroll.addEventListener('touchend', this._end, false);
			})
		},
		methods: {
			_start(e) {
				let scroll = this.$refs.scrollUl;
				this.start = e.touches[0].pageY;
				if(scroll.style.transform == ''){
					this.translateY = 0;
				}else {
					let a = scroll.style.transform;
					a = a.match(/-?\d+\.?\d*/g)[0];
					this.translateY = parseInt(a);
				}
			},
			_move(e) {
				let scroll = this.$refs.scrollUl;
				let move = (e.touches[0].pageY - this.start)*3;		//移动的距离
				let y = this.translateY + move;
				scroll.style.transform = 'translateY(' + y + 'px)';
			},
			_end(e) {
				let scroll = this.$refs.scrollUl;
				//滚动的可见高度
				let h = this.$refs.sideBar.clientHeight - this.$refs.sidebarUser.clientHeight - this.$refs.sidebarSetting.clientHeight - this.$refs.sidebarBottom.clientHeight;
				
				if(scroll.style.transform != ''){
					let a = scroll.style.transform;
					a = a.match(/-?\d+\.?\d+/g)[0];
					if(a > 0) {
						scroll.style.transform = 'translateY(0px)';
					}
					//最大滚动距离
					let maxh = this.$refs.scrollUl.clientHeight-h + 52;
					if(a < -maxh) {
						scroll.style.transform = 'translateY(' + (-maxh) + 'px)';
					}
				}
			},
			sidebarHide() {
      	this.sidebarDate = false;
      	document.body.classList.remove('dialog-open');
      	document.body.scrollTop = document.documentElement.scrollTop = this.scrollTop;
      	document.body.style.top = 0;
      	this.$emit('sidebarHide');
      },
      getList() {
      	this.$http.get('api/4/themes').then(response => {
          let data = response.body;
          this.list = data.others;
        },response => {
          console.log('err');
        });
      },
      returnIndex() {
				document.body.classList.remove('dialog-open');
      }
		}
	}
</script>

<style lang="scss">
	@import './sidebar.scss';
</style>