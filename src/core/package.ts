import Vue, { VueConstructor } from 'vue';

type InstallFunction = (Vue: VueConstructor, options?: any) => void;

interface PackageConfig {
  install?: InstallFunction;
  [key: string]: any;
}

const installHandler = (fn: InstallFunction, cb: () => void) => {
  return (Vue: VueConstructor) => {
    if (fn && typeof fn === 'function') {
      fn(Vue);
    }
    cb();
  };
};

export const createPackage = <T extends PackageConfig>(packageConfig: T): T => {
  let inited = true;
  const install = installHandler(packageConfig.install, () => {
    inited = true;
  });

  window.setTimeout(() => {
    if (!inited) {
      install(Vue);
    }
  });

  packageConfig.install = install;

  return packageConfig;
};
