// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';

import Home from './components/home/home.vue';
import Member from './components/member/member.vue';
import Search from './components/search/search.vue';
import Shopcart from './components/shopcart/shopcart.vue';
import NewList from './components/news/newlist.vue';
import NewsDetail from './components/news/newsDetail.vue';
import PhotoShare from './components/photo/photoShare.vue';
import PhotoDetail from './components/photo/photoDetail.vue';
import GoodsList from './components/goods/goodslist.vue';
import GoodsDetail from './components/goods/goodsdetail.vue';

import connect from './components/common/connect.js';

//声明nacbar全局组件
import NavBar from './components/common/navBar.vue';
Vue.component('navBar', NavBar);

//引入路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);


let router = new VueRouter({
    linkActiveClass: 'mui-active',
    routes: [
        { path: '/', redirect: { name: 'home' } },
        { name: 'home', path: '/home', component: Home },
        { name: 'member', path: '/member', component: Member },
        { name: 'search', path: '/search', component: Search },
        { name: 'shopcart', path: '/shopcart', component: Shopcart },
        { name: 'list', path: '/news/list', component: NewList },
        {
            name: 'newsdetail',
            path: '/news/detail',
            component: NewsDetail
        },
        {
            name: 'photoshare',
            path: '/photo/share',
            component: PhotoShare
        }, {
            name: 'photodetail',
            path: '/photo/detail/:id',
            component: PhotoDetail
        }, {
            name: 'goodslist',
            path: '/goods/list',
            component: GoodsList
        }, {
            name: 'goodsdetail',
            path: '/goods/detail',
            component: GoodsDetail
        }
    ]
});

//引入mint-ui
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);

//引入axios,挂载原型,默认配置
import axios from 'axios';
Vue.prototype.$axios = axios;

//引入vue-preview
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

//引入Mui
import '../static/mui-master/dist/css/mui.css';

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router: router,
    render: function(c) {
        return c(App);
    }
})