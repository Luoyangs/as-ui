## flex 布局介绍

## markomponent

markomponent  is the seller marketing FE common component library.

Due to the large number of components included, we only provide usage on demand.

<br>

## Usage

**markomponent exports the code for ES2015**

**markomponent exports the code for ES2015**

**markomponent exports the code for ES2015**

<br>


So first you need to modify the configuration of Webpack:

#### Configuring Webpack

```javascript
{
  module: {
    rules: [
   	  {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('node_modules/markomponent/lib')]
      }
    ]
  }
}
```

For TypeScript

```javascript
{
  module: {
    rules: [
   	  {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('node_modules/markomponent/lib')]
      },
      {
        test: /\.tsx?$/,
        loader: 'babel-loader'
      }
    ]
  }
}
```

**Notes**: Babel 6 may report an error when processing the node_modules internal package, it is recommended to [upgrade to babel 7](https://babeljs.io/docs/en/v7-migration), you can use the following command

```bash
npx babel-upgrade --write
```

<br>

#### Import on demand

We need to use a babel plugin, so first install [`babel-plugin-component`](https://github.com/ElementUI/babel-plugin-component)

```bash
yarn add -D babel-plugin-component
```

Then, add config in `.babelrc` or `babel.config.js`：

```json
"plugins": [
  [
    "component",
    {
      "libraryName": "markomponent"
    }
  ]
]
```

For Import markomponent and [ShopeeUI](http://shopee-ui.gitlab.io/shopee-ui/) at the same time

```json
"plugins": [
  [
    "component",
    {
      "libraryName": "shopee-ui",
      "styleLibraryName": "theme-default"
    }
  ],
  [
    "component",
    {
      "libraryName": "markomponent"
    },
    "markomponent"
  ]
]
```

<br>

#### Locale

```javascript
import Locale from 'markomponent/lib/locale';

Locale.locale(language); // 'en'|'en-my'|'en-ph'|'id'|'zh-Hant'|'vi'|'th'|'ms-my'|'zh-Hans'
```

For TypeScript

```typescript
import Locale from 'markomponent/lib/locale';
import { LanguageCode } from 'markomponent/types/locale';

Locale.locale(languageCode as LanguageCode);
```

<br>

## 开发引导和规范

#### 创建新组件

新建命令会自动生成组件需要的一些基础文件，减小设计成本解放一些生产力，同时也为了让项目更规范。

```shell
yarn new component-name
```

<br>

#### 项目目录结构

```javascript
markomponent
|-- build                    // 构建脚本目录，不要轻易修改脚本
|-- lib                      // 生产导出目录
|-- packages                 // 业务组件源码目录
|   |-- index.ts             // 所有业务组件主入口
|   |-- component-a
|   |   |-- src
|   |   |-- index.ts
|   |   |-- README.md
|   |-- ..
|-- src                      // 源码目录
|   |-- index.ts             // 主入口
|   |-- utils
|   |-- constants
|   |-- filters
|   |-- mixins
|   |-- styles               // 公共样式
|   |-- localization         // 翻译配置目录，维护各个组件的transify mapping
|   |-- locale
|-- types
|-- components.json          // 各个组件入口配置
|-- package.json
|-- README.md
```

<br>

#### **规范和约定**

1. 每个组件都应建在 `packages` 的直属目录下，并以`index.ts`作为入口文件，`src`为组件的源码目录。每个组件都需在`package/index.ts`导出和在`compoennts.json`添加组件名和组件路径。

2. 组件**不能申明为全局组件**，也不能在Vue下添加属性。如有需要，可以通过对象的形式向外导出：

   ```typescript
   // defalut
   import CompoentName from './src/CompoentName.vue';
   export default CompoentName;
   
   // two component
   import CompoentA from './src/CompoentA.vue';
   import CompoentB from './src/CompoentB.vue';
   export default {
     a: CompoentA,
     b: CompoentB
   };
   
   // a modal function
   import openExampleModal from './src';
   export default {
     modal: openExampleModal
   };
   
   // a mixin
   import ExampleMixin from './src/ExampleMixin';
   export default {
     mixin: ExampleMixin
   };
   ```

3. 每个组件都需要在内部**处理好自己的依赖**，以便直接引入：

   对**ShopeeUI**的依赖，在`index.ts`中引入依赖并添加`install`方法加载依赖。需特别注意对modal和toast的依赖。如：

   ```typescript
   import { VueConstructor } from 'vue';
   import { Modal } from 'shopee-ui';
   import openExampleModal from './src';
   
   export default {
     modal: openExampleModal，
     install(Vue: VueConstructor) {
       Vue.use(Modal);
     }
   };
   ```

   对**SellerService**的依赖，在需要使用的地方引入，对需要初始化的service，在`index.ts`中初始化：

   ```typescript
   import { VueConstructor } from 'vue';
   import { shopService } from 'seller-service';
   import ExampleMixin from './src/ExampleMixin';
   
   export default {
     mixin: ExampleMixin，
     install(Vue: VueConstructor) {
       // init service
       shopService.create({ host: hostname });
     }
   };
   ```

   对**markomponent**内部组件的依赖，按组件从markomponent引入，加上Shopee前缀，如：

   ```typescript
   import { ComponentA, ComponentB } from 'markomponent';
   
   @Component({
     name: 'ComponentC',
     components: {
       ShopeeComponentA: ComponentA,
       ShopeeComponentB: ComponentB
     }
   })
   export default class ComponentC extends Vue {}
   ```

   对其他**第三方库**的依赖，配置到webpack的**externals**中，以避免版本更新可能带来的问题， 如：

   ```javascript
   externals: [{
     '@shopee_common/time': '@shopee_common/time'
   }]
   ```

4. 组件导出时需**使用`createPackage`方法进行包装**，以便单独引入时会立即执行`install`方法：

   ```typescript
   import { createPackage } from '@src/core';
   
   export default createPackage(Option); // Option为组件提供的使用方式，见规范2,3
   ```

5. 每个Vue的派生类（包括Component，Mixin）都需要**添加name属性**：

   ```typescript
   @Component({
     name: 'ButtonInput'
   })
   export default class ButtonInput extends Vue {}
   ```

   ```typescript
   @Component({
     name: 'LocaleMixin'
   })
   export default class LocaleMixin extends Vue {}
   ```

6. 需要按以下步骤**处理好组件的翻译**：

   1. 在`src/localization`目录下添加组件目录，并新建`index.js`文件，在该文件中维护组件的`transify map`，需注意toast中可能弹出的后台指定的提示。src目录下文件的`transify map`在`src/localization/base`中维护

   2. 新建`src/locale/lang/index.ts`：

      ```typescript
      import lang from '@src/locale/lang/compoent-name/all.json';
      import cnLang from '@src/locale/lang/compoent-name/all-cn.json';
      import { languageMap } from '@src/core';
      
      export default languageMap({
        lang,
        cnLang
      });
      ```

   3. 执行`node build/fetch-transify.js` 命令拉取翻译

   4. 在组件目录`index.ts`文件中注入翻译文件，需注意处理cn的翻译：

      ```typescript
      // config translation
      import Locale from '@src/locale';
      import langs from '@src/locale/lang/compoent-name';
      Locale.config(langs);
      ```
      如果依赖的src目录下文件也有需要翻译的，需要添加base的翻译：

      ```typescript
      // config translation
      import Locale from '@src/locale';
      import baseLangs from '@src/locale/lang/base';
      import langs from '@src/locale/lang/compoent-name';
      Locale.config([baseLangs, langs]);
      ```

7. 需要在组件根目录下补充`READMD.md`，并遵照一定的书写规范。

8. 需要在types目录下补充`component-name.d.ts`，以方便使用Typescript。

9. 为方便开发，可以在`examples/components`目录下添加组件示例，并在`examples/router.ts`中增加相应路由。不要在App.vue引入组件，如非必要，不要提交对App.vue的修改。

<br>

##### 公共方法的位置

1. 只在单个组件内部的通用方法放在组件内部。

2. 在多个组件使用的公共方法可放在 `src/utils` 目录下，不需在`src/utils/index`文件中导出，引入时指到直接导出方法的文件路径，如：

   ```javascript
   import { deepMerge } from '@src/utils/helper';
   ```

3. 需要暴露给外部项目使用的公共方法(可能同时在seller-common内部组件使用)，放在`src/utils` 目录下，并在`src/utils/index`文件中导出，引入时指到`@src/utils`。

   **filters、constants、mixins等，参考公共方法的处理方法**

<br>

##### 引入图片

```javascript
'@public/images/xxx'         // js引入图片
'@public/svg/xxx'            // js引入SVG
'~@public/images/xxx'        // css引入非雪碧图图片
'../public/sprites/xxx'      // css引入雪碧图图片
```

##### 引入公用样式

``` scss
@import '~@src/styles/constants.scss';    // 公用变量
```

<br>

## TODO

1. PriceInput
2. DiscountInput
3. Utils
