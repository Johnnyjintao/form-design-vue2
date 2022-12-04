import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
import DesignForm from '../src/index.js'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(DesignForm);

// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
// Vue.use(Antd);


new Vue({
  render: h => h(App),
}).$mount('#app')
