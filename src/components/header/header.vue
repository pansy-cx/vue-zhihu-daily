<template>
	<div class="header" :style="imgWeserv(image)">
		<h3>{{title}}</h3>
		<span v-show="imageSource">图片：{{imageSource}}</span>
	</div>
</template>

<script>
	export default {
		props: {
			image: {
				type: String
			},
			title: {
				type: String
			},
			imageSource: {
				type: String
			}
		},
		methods: {
      imgWeserv($url) {
        let url =  $url.replace(/https?:\/\/p/g,'https://images.weserv.nl/?url=p');
        return "backgroundImage: url('" + url + "')";
      }
    }
	}
</script>

<style lang="scss">
	.header {
		width: 100%;
		height: 240px;
		background-color: #ccc;
		background-size: 100%;
		background-position: center;
		background-repeat: no-repeat;
		position: relative;
		h3 {
			position: absolute;
			bottom: 23px;
			line-height: 1.2;
			left: 0;
			padding: 0 18px;
			font-weight: 300;
			font-size: 21px;
			color: #fff;
			text-shadow: 0px 1px 2px rgba(0,0,0,.3);
		}
		span {
			position: absolute;
    	bottom: 10px;
    	color: rgba(255,255,255,.6);
    	text-shadow: 0px 1px 2px rgba(0,0,0,.3);
    	font-size: 9px;
    	right: 10px;
		}
	}
</style>