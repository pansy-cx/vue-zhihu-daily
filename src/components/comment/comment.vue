<template>
	<div class="comment" >
		<div class="comment-top">
			<p>{{comment}} 条点评</p>
		</div>
		<div class="comment-content">
			<div class="content long">
				<div v-show="this.longcomment.length == 0" class="none">
					<i class="iconfont icon-yizi"></i>
					<p>长评位虚席以待</p>
				</div>
				<div v-show="this.longcomment.length != 0" class="have">
					<p>{{this.longcomment.length}} 条长评</p>
					<ul>
						<li v-for="item in this.longcomment">
							<img :src="replace(item.avatar)">
							<div>
								<p class="content-top">
									<span>{{item.author}}</span>
									<span>
										<i class="iconfont icon-good"></i>
										{{item.likes}}
									</span>
								</p>
								<p class="content-content" v-html="wrap(item.content)"></p>
								<div class="reply" v-if="item.reply_to">
									<div v-if="item.reply_to.status == 0">
										//{{item.reply_to.author}}：
										<span>{{item.reply_to.content}}</span>
									</div>
									<div v-else>
										<span>{{item.reply_to.err_msg}}</span>
									</div>
								</div>
								<p class="item">{{jsondate(item.time,"MM-dd hh:mm")}}</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="change" @click="shortShow">
				<span>{{this.shortcomment.length}} 条短评</span>
				<i class="iconfont icon-down1" :class="{up: this.booShort}"></i>
			</div>
			<div class="content short" v-show="booShort">
				<div v-show="this.shortcomment.length == 0" class="none"></div>
				<div v-show="this.shortcomment.length != 0" class="have">
					<ul>
						<li v-for="item in this.shortcomment">
							<img :src="replace(item.avatar)">
							<div>
								<p class="content-top">
									<span>{{item.author}}</span>
									<span>
										<i class="iconfont icon-good"></i>
										{{item.likes}}
									</span>
								</p>
								<p class="content-content">{{item.content}}</p>
								<div class="reply" v-if="item.reply_to">
									//{{item.reply_to.author}}：
									<span>{{item.reply_to.content}}</span>
								</div>
								<p class="item">{{jsondate(item.time,"MM-dd hh:mm")}}</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="comment-bottom">
			<div class="wrapper">
				<i class="iconfont icon-left" @click="back"></i>
				<span>
					<i class="iconfont icon-write"></i>
					写点评
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			comment: {
				type: Number
			},
			id: {
				type: Number
			}
		},
		data() {
			return {
				longcomment: {},
				shortcomment: {},
				booShort: 0,
				boxShow: 0
			}
		},
		created() {
			window.document.body.scrollTop = 0;
			this.$http.get('api/4/story/' + this.id + '/long-comments').then(response => {
        let data = response.body;
        this.longcomment = data.comments;
      },response => {
        console.log('err');
      });
      this.$http.get('api/4/story/' + this.id + '/short-comments').then(response => {
        let data = response.body;
        this.shortcomment = data.comments;
      },response => {
        console.log('err');
      });
		},
		beforeRouteEnter(to, from , next) {
			document.getElementById('article-content').style.display = 'none';
			document.getElementById('article-bottom').style.display = 'none';
			next();
		},
		beforeRouteLeave(to,from,next) {
			document.getElementById('article-content').style.display = 'block';
			document.getElementById('article-bottom').style.display = 'block';
			next();
		},
		methods: {
			shortShow() {
				if(this.booShort) {
					this.booShort = 0;
				}else {
					this.booShort = 1;
					let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
					let h = scrollTop + document.documentElement.clientHeight - 120;
					let a = scrollTop;
					let t = setInterval(function(){
						if(a < h){
							document.body.scrollTop = document.documentElement.scrollTop = a;
							a += 50;
						}else {
							document.body.scrollTop = document.documentElement.scrollTop = h
							clearInterval(t);
						}
					},20);
				}
			},
			back() {
				window.history.back(-1);
			}
		}
	}
</script>

<style lang="scss">
	@import './comment.scss';
</style>
