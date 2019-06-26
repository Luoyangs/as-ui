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
    component: () => import(/* webpackChunkName: "testbat" */ './components/testbat.vue')
  }
];

export default new Router({
  routes: componentsRouterConfig
});
