// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import filter from './filter.js';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import article from './components/article/article.vue';
import articleTheme from './components/article/article-theme.vue';
import comment from './components/comment/comment.vue';
import theme from './components/theme/theme.vue';

import './assets/style/iconfont.scss';

Vue.use(VueRouter);
Vue.use(VueResource);

let routes = [
  {
  	path: '/', 
  	name: 'index', 
  	component: App, 
  	children: [
      {
        path: 'article/:id', 
        component: article,
        name: 'article',
        children: [
          {path: 'comment', component: comment}
        ]
      },
      {
        path: 'theme/:id',
        name: 'theme',
        component: theme,
      },
      {
        path: 'theme/article/:id', 
        component: articleTheme,
        name: 'themearticle',
        children: [
          {path: 'comment', component: comment}
        ]
      }
    ]
  }
];
let router = new VueRouter({
  'linkActiveClass': 'active',
  routes // （缩写）相当于 routes: routes
});
let app = new Vue({
  router
}).$mount('#app');


export default app;