import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
import DesignForm from '../src/index.js'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(DesignForm);


new Vue({
  render: h => h(App),
}).$mount('#app')
