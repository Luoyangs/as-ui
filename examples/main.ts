import Vue from 'vue';
import router from './router';
import App from './App.vue';

// import AsUI from 'as-ui';
// Vue.use(AsUI);
import 'highlight.js/styles/a11y-light.css';
import CommonDemoBlock from './common/common-block.vue';
import { Button } from 'as-ui';

Vue.component('demo-block', CommonDemoBlock);
Vue.component(Button.name, Button);

Vue.config.devtools = true;

const _ = new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
