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

当使用路由参数时，例如从 「 /theme/12 」 导航到 「 theme/13」，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着*组件的生命周期钩子不会再被调用*。  
如果想刷新页面，可以用 watch 监听 $route 对象：  

```js
export default {
    created() {
        this.getDate()
    },
    methods: {
        getDate() {
            <!--  -->
        }
    },
    watch: {
        '$route': function() {
            <!--  -->
            this.getDate()  //重新获取数据
        }
    }
}
```

参考文档 [动态路由匹配](https://router.vuejs.org/zh-cn/essentials/dynamic-matching.html)

##### 时间格式化  

Json 获取时间格式是一串 10 位数的数字，是从 1970 年 1 月 1 日至今的毫秒数。但 js 时间戳是 13 位数的，需要做一下转换。在全局定义一个函数  

```js
Vue.prototype.jsonDate = function() {
    <!--  -->
}
```

然后在需要用的地方加上 jsonDate(getDate)  

具体代码参考 [JS 格式化日期函数](http://idmrchan.com/2017/04/27/json-data-formate/)

##### 父子组件通信  

在组件中，子组件需要获取父组件数据，父组件使用 v-bind 动态绑定数据，子组件使用 prop 获取：  

父
```js
<child :date="date"><\/child>
```

子
```js
props: {
    date: {
        type: String,
        defalut: '',    //可以指定默认值
    }
}
```

prop 是单向数据流，若要双向绑定就比较复杂了，我搞了半天，写了个笔记。[文章](http://idmrchan.com/2017/04/27/vue-custom-prop/)  

### 总结

除了以上其他还有一些移动端的坑，鼠标事件与触摸屏事件的区别，还有在手机上使用 fixed 与电脑的区别等问题，写到后面我觉得不能一味的按照 App 的模式来写，有些该适当做些改变。  

性能上，在 Chrome 上使用 F12 模拟手机是没有问题，手机只测试了 iPhone 感觉性能不是太好，在切换的时候可能是网速的问题，会有卡顿。估计是我移动端写的少的原因，导致组件加载过大，或是在浏览器上不能一味模仿 App。  

功能上，侧重实现组件间的切换功能，还有获取文章等信息，有些如分享、夜间模式等写的多了，不想在写了，有时间在补上。  

总之，移动端性能和桌面端不能比的。在这一方面还需要多多学习

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
