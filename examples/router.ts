import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import hljs from 'highlight.js';
import { getElementPosition } from '@src/utils';
import blogRoutes from './routes.json';

export const blogRouterConfig: RouteConfig[] = [];
Object.keys(blogRoutes).forEach(key => {
  if (key && blogRoutes[key].length) {
    const r: RouteConfig = {
      name: key,
      path: `/${key}`,
      component: () => import('./common/empty.vue'),
      children: []
    };

    blogRoutes[key].forEach((item: any) => {
      r.children.push({
        name: item.name,
        path: item.path,
        component: () => import('./blogs/' + item.filePath)
      });
    });

    blogRouterConfig.push(r);
  }
});

Vue.use(Router);

export const componentsRouterConfig: RouteConfig[] = [
  {
    path: '/base',
    name: '基础组件',
    component: () => import('./common/empty.vue'),
    children: [
      {
        path: 'input',
        name: 'input',
        component: () => import(/* webpackChunkName: "input" */ './docs/input.md')
      }
    ]
  }
];

const router = new Router({
  mode: 'hash',
  routes: componentsRouterConfig
});

router.addRoutes(blogRouterConfig);

router.beforeEach((to: any, from: any, next: any) => {
  next();

  router.app.$nextTick(() => {
    if (!to.hash) {
      return;
    }

    const anchor = document.querySelector(to.hash);
    if (anchor) {
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
