<template>
	<div class="article" ref="article">
		<v-header :image="image" :title="title" :imageSource="image_source"></v-header>
		<div class="article-content" id="article-content" v-html="replace(body)">
		</div>
		<div class="article-bottom" id="article-bottom">
			<div class="icon-wrapper">
				<div class="icon">
					<i class="iconfont icon-left" @click="back"></i>
				</div>
				<div class="icon">
					<i class="iconfont icon-down" @click="sorry"></i>
				</div>
				<div class="icon">
					<i class="iconfont icon-good" @click="goodCount" :class="{active: goodactive}">
					<span v-show="good">{{this.good}}</span>
				</i>
				</div>
				<div class="icon">
					<i class="iconfont icon-icon29" @click="sorry"></i>
				</div>
				<div class="icon">
					<router-link v-bind:to="'./' + this.id + '/comment'">
					<i class="iconfont icon-pinglun">
						<span>{{this.comment}}</span>
					</i>
					</router-link>
				</div>
			</div>
		</div>
		<router-view :comment="comment" :id="id"></router-view>
	</div>
</template>

<script>
	import header from '../header/header.vue';
	export default {
		data() {
			return {
				id: 0,
				image: '',
				title: '',
				image_source: '',
				body: '',
				css: '',
				good: 0,
				goodactive: false,
				comment: 0
			}
		},
		created() {
			window.document.body.scrollTop = 0;
			let url = window.location.href;
			this.id = parseInt(url.match(/\d+$/g));
			this.$http.get('api/4/news/' + this.id).then(response => {
        let data = response.body;
        this.image = data.image;
        this.title = data.title;
        this.image_source = data.image_source;
        this.body = data.body;
        this.css = data.css;
      },response => {
        console.log('err');
      });
      this.$http.get('api/4/story-extra/' + this.id).then(response => {
        let data = response.body;
        this.good = data.popularity;
        this.comment = data.comments;
      },response => {
        console.log('err');
      });
		},
		beforeRouteEnter(to,from,next) {
			document.getElementById('content').style.display = 'none';
			next();
		},
		beforeRouteLeave(to,from,next) {
			document.getElementById('content').style.display = 'block';
			next();
		},
		methods: {
			goodCount() {
				if(!this.goodactive) {
					this.good++;
					this.goodactive = true;
				}else {
					this.good--;
					this.goodactive = false;
				}
			},
			back() {
				window.history.back(-1);
			},
			sorry() {
				alert('sorry , 还未添加此功能');
			}
		},
    components: {
    	'v-header': header
    }
	}
</script>

<style lang="scss">
	@import './article.scss';
	.article {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		z-index: 50;
		.article-content {
			margin-bottom: 40px;
		}
		.article-bottom {
			position: fixed;
			width: 100%;
			left: 0;
			bottom: 0;
			background-color: #fff;
			border-top: 1px solid #e3e3e3;
			.icon-wrapper {
				display: flex;
				.icon {
					line-height: 40px;
					text-align: center;
					flex: 1;
					>i {
						font-size: 18px;
						color: #333;
						&.icon-icon29 {
							font-size: 24px;
						}
						&.icon-good {
							position: relative;
							span {
								position: absolute;
								font-size: 10px;
								line-height: 10px;
								color: #999;
								top: 5px;
							}
							&.active {
								color: rgb(32, 180, 241);
								span {
									color: rgb(32, 180, 241);
								}
							}
						}
					}
					a {
						display: block;
						>i {
							font-size: 18px;
							color: #333;
							&.icon-pinglun {
								position: relative;
								span {
									position: absolute;
									font-size: 8px;
									line-height: 10px;
									top: 0;
									right: -8px;
									background-color: rgb(32, 180, 241);
									padding: 0 6px;
									color: #fff;
								}
							}
						}
					}
				}
			}
		}
	}
</style>