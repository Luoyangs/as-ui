import { VueConstructor } from 'vue';
import { Button } from '../packages';

export {
  Button
};

const components = [
  Button
];

const install = (Vue: VueConstructor, options?: any) => {
  components.forEach((component: any) => {
    if (component.install) {
      component.install(Vue, options);
    }
  });
};

export default {
  install,
  ...components
};
