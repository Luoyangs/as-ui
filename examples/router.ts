import Vue from 'vue';
import Router from 'vue-router';

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

export default new Router({
  mode: 'hash',
  routes: componentsRouterConfig
});
