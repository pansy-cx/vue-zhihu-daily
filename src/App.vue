<template>
<div class="container">
  <v-swiper :title="title" ref="swiper" v-on:sidebarShow="sidebarShow" :sidebar="sidebarDate"></v-swiper>
  <div class="content" id="content">
    <div class="content-inner" v-for="(dataItem,item) in data" ref="inner">
      <div class="date" v-show="item!=0" v-html="dateFormat(dataItem.date)"></div>
      <ul class="list-content">
        <li v-for="content in dataItem.stories">
          <router-link v-bind:to="'./article/' + content.id">
            <p>{{content.title}}</p>
            <img :src="imgWeserv(content.images)">
          </router-link>
        </li>
      </ul>
    </div>
  </div>
  <v-sidebar v-show="sidebarDate" v-on:sidebarHide="sidebarHide" :scrollTop="scrollTop" :indexactive="true"></v-sidebar>
  <router-view></router-view>
</div>
</template>

<script>
  import swiper from './components/swiper/swiper.vue';
  import sidebar from './components/sidebar/sidebar.vue';
  export default {
    props: {
      today: {
        type: Number
      }
    },
    data() {
      return {
        data: {},     //所有数据
        date: this.today,     //时间，用于获取历史文章 api
        dateArr: [],  //储存时间线
        title: '',    //输出给 swiper
        length: 1,    //获取文章的天数
        loading: true,
        heightArr: [], //每天文章的高度
        sidebarDate: false,  //显示侧边栏
        scrollTop: 0
      }
    },
    created() {
      this.getLastest();
      window.addEventListener('scroll', this.getScrollList, false);
      window.addEventListener('scroll', this.changeTitle, false);
    },
    mounted() {
    },
    methods: {
      // 图片跨域
      imgWeserv($url) {
        return $url[0].replace(/https?:\/\/p/g,'https://images.weserv.nl/?url=p')
      },
      //最新文章
      getLastest() {
        this.$http.get('api/4/news/latest').then(response => {
          let data = response.body;
          this.$set(this.data,0,data);
          this.date = data.date;
          this.title = this.date;
          // 储存今天日期到数组
          this.dateArr.push(this.title);
        },response => {
          console.log('err');
        });
      },
      // 滚动加载历史文章
      getScrollList () {
        if ((window.screen.height + window.document.body.scrollTop) + 100 > window.document.body.scrollHeight && this.loading) {
          this.getNews()
        }
      },
      // 获取历史文章
      getNews() {
        this.loading = false;
        this.$http.get('api/4/news/before/' + this.date).then(response => {
          let data = response.body;
          this.$set(this.data,this.length,data);
          this.length++;
          this.loading = true;
          this.date = data.date;
          
          //获取时把上一天的文章高度和日期储存到数组
          let inner = this.$refs.inner;
          let height = [];
          let swiper = 0;
          if(this.$refs.swiper){
            swiper = this.$refs.swiper.$el.clientHeight;    //swiper 高度 
          }
          let h = swiper;
          for(let i=0; i< inner.length; i++) {
            h += inner[i].clientHeight
            height.push(h);
          }

          this.heightArr = height;
          this.dateArr.push(this.date);
        },response => {
          console.log('err');
        });
      },
      // 改变标题
      changeTitle() {
        for(let i=0; i< this.heightArr.length;i++) {
          if(window.document.body.scrollTop < this.heightArr[0]){
            // 第一天
            this.title = this.dateArr[0];
          }else if(window.document.body.scrollTop >= this.heightArr[this.heightArr.length-1]){
            // 向下滚动动态修改时间
            this.title = this.dateArr[this.heightArr.length];
          }else if(window.document.body.scrollTop > this.heightArr[i-1] && window.document.body.scrollTop < this.heightArr[i]) {
            // 向上滑时，修改当前内容的时间
            this.title = this.dateArr[i];
          }
        }
      },
      sidebarShow() {
        this.sidebarDate = true;
        this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      },
      sidebarHide() {
        this.sidebarDate = false;
      }
    },
    components: {
      'v-swiper': swiper,
      'v-sidebar': sidebar
    }
  }
</script>

<style lang="scss">
  body {
    font-family: "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  }
  .content {
    .content-inner {
      .date {
        width: 100%;
        background-color: rgb(2, 143, 214);
        text-shadow: 0px 1px 2px rgba(0,0,0,.3);
        text-align: center;
        line-height: 30px;
        color: #fff;
        font-size: 18px;
        padding: 5px 0;
      }
      .list-content {
        li {
          margin: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
          position: relative;
          height: 75px;
          &:last-child {
            border-bottom: 0;
            margin-bottom: 0;
          }
          p {
            margin-right: 80px;
            color: #000;
            font-size: 16px;
            line-height: 1.2;
          }
          img {
            width: 75px;
            height: 75px;
            position: absolute;
            top: 0;
            right: 0;
          }
        }
      }
    }
  }
</style>