import Vue from 'vue';
import router from './router';
import App from './App.vue';

Vue.config.devtools = true;

const _ = new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
