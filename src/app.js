import Vue from 'vue';
import App from './App.vue';
// 引入全部的组件
import './components/index.js';
// 按需引入vant 组件
import "./vantConfig.js";
// 引入项目的全局样式
import './sass/base.scss';
// 引入mock数据
import "../mock/index.js";
// 引入store
import store from './store.js';
// 引入路由配置
import router from './router.js';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
