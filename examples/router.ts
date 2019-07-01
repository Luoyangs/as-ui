import Vue from 'vue';
import Router from 'vue-router';
import hljs from 'highlight.js';
import { getElementPosition } from '@src/utils';

Vue.use(Router);

export const componentsRouterConfig = [
  {
    path: '',
    redirect: '/testbat'
  },
  {
    path: '/testbat',
    name: 'testbat',
    component: () => import(/* webpackChunkName: "input" */ './docs/input.md')
  }
];

const router = new Router({
  mode: 'hash',
  routes: componentsRouterConfig
});

router.beforeEach((to: any, from: any, next: any) => {
  next();

  router.app.$nextTick(() => {
    if (!to.hash) {
      return;
    }

    const anchor = document.querySelector(to.hash);
    if (!!anchor) {
      const position = getElementPosition(anchor, { x: 0, y: 80 });
      if (position) {
        window.scrollTo(position.x, position.y);
      }
    }
  });
});

router.afterEach((to: any, from: any) => {
  router.app.$nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
});

export default router;
