# vue-zhihu-daily

### 选择   

这个项目是我在做完 [vue 饿了么](https://github.com/pansy-cx/vue-sell)  之后做的，vue 饿了么是边看别人源码边写的，所以想自己独立做一个。之所以选择做知乎日报，是因为

- 知乎日报适合做单页面  
- 个人较熟悉知乎日报
- 有大神提供了 API

本来也在犹豫会不会太多人写了，可是看了一下好像都是用 Vue1，所以就自己写了一个用于练习 Vue。  

*感谢 [@izzyleung](https://github.com/izzyleung/) 大神提供的 [API](https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90)*

### 框架

- 使用 Vue-Cli 脚手架，Vue + vue-router  
- 使用 [swiper](http://www.swiper.com.cn/) 解决触摸屏滑动  
- 使用 vue-resource 获取 API 

### 遇到的问题   

##### 1. 跨域解决
/config/index.js

```js
...
dev {
    ...
    proxyTable: {
        '/api': {
            target: 'http://news-at.zhihu.com/',    //知乎 api 链接
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/api'
            }
        }
    }
}
```

使用 vue-resource
```js
this.$http.get('api/4/news/latest').then(response => {
    this.data = response.body;
},response => {
    console.log('err');
});
```

这个只能用于测试环境，上线环境无法使用

##### 图片盗链

知乎有防盗链，图片会全部丢失。我是用 [weserv](https://images.weserv.nl/) 由 weserv 服务器转发  

##### 单页应用

由于使用的是单页，所有组件都由 index 跳转，要特别小心浏览器返回时 JS 无法加载，所以把主要的页面写在 App.vue 里，包括 API 的实时获取。打开别的链接只是加载了组件。并使用 「beforeRouteEnter」和 「beforeRouteLeave」来切换需要隐藏显示的首页组件，具体参考[导航钩子](https://router.vuejs.org/zh-cn/advanced/navigation-guards.html#incomponent-guards)  

##### router-link

我 sidebar 组件 「 ./ 」 目录下使用，「 ./theme 」 目录下也使用。这样用 ``` <router-link to="url"></router-link> ``` 会导致链接从 「 theme/:id 」 变为 「 theme/theme/:id 」    
给 router 设置一个 name ，然后跳转 ```<router-link v-bind:to="{ name: name ,params:{ id:id }}"></router-link>``` 这种方式  
这样链接就不会错了

##### vue-router 同路径跳转不刷新页面

*明天更新例子！*

##### 时间格式化

##### 父子组件通信

### 使用

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
