import Vue from 'vue';
import router from './router';
import App from './App.vue';

// import AsUI from 'as-ui';
// Vue.use(AsUI);
import { Button } from 'as-ui';
Vue.component(Button.name, Button);

import CommonDemoBlock from './common/common-block.vue';
Vue.component('demo-block', CommonDemoBlock);

// import hljs from 'highlight.js';
// import 'highlight.js/styles/monokai-sublime.css'; //样式文件
// Vue.directive('highlight', function (el) {
//   let blocks = el.querySelectorAll('pre code');
//   blocks.forEach((block) => {
//     hljs.highlightBlock(block);
//   });
// });

Vue.config.devtools = true;

const _ = new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
