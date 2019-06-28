## Button 按钮
常用的操作按钮。

### 基础用法

基础的按钮用法。

:::demo 使用`type`、`plain`、`round`和`circle`属性来定义 Button 的样式。

```html
<div>
  <as-button>默认按钮</as-button>
  <as-button @click="handleClick" type="primary">主要按钮</as-button>
  <as-button type="success">成功按钮</as-button>
  <as-button type="info">信息按钮</as-button>
  <as-button type="warning">警告按钮</as-button>
  <as-button type="danger">危险按钮</as-button>
</div>

<div>
  <as-button plain>朴素按钮</as-button>
  <as-button type="primary" plain>主要按钮</as-button>
  <as-button type="success" plain>成功按钮</as-button>
  <as-button type="info" plain>信息按钮</as-button>
  <as-button type="warning" plain>警告按钮</as-button>
  <as-button type="danger" plain>危险按钮</as-button>
</div>

<div>
  <as-button round>圆角按钮</as-button>
  <as-button type="primary" round>主要按钮</as-button>
  <as-button type="success" round>成功按钮</as-button>
  <as-button type="info" round>信息按钮</as-button>
  <as-button type="warning" round>警告按钮</as-button>
  <as-button type="danger" round>危险按钮</as-button>
</div>

<div>
  <as-button icon="as-icon-search" circle></as-button>
  <as-button type="primary" icon="as-icon-edit" circle></as-button>
  <as-button type="success" icon="as-icon-check" circle></as-button>
  <as-button type="info" icon="as-icon-message" circle></as-button>
  <as-button type="warning" icon="as-icon-star-off" circle></as-button>
  <as-button type="danger" icon="as-icon-dasete" circle></as-button>
</div>

<script>
  export default {
    methods: {
      handleClick() {
        console.log('handle click');
      }
    }
  }
</script>
```
:::

### 禁用状态

按钮不可用状态。

:::demo 你可以使用`disabled`属性来定义按钮是否可用，它接受一个`Boolean`值。

```html
<div>
  <as-button disabled>默认按钮</as-button>
  <as-button type="primary" disabled>主要按钮</as-button>
  <as-button type="success" disabled>成功按钮</as-button>
  <as-button type="info" disabled>信息按钮</as-button>
  <as-button type="warning" disabled>警告按钮</as-button>
  <as-button type="danger" disabled>危险按钮</as-button>
</div>

<div>
  <as-button plain disabled>朴素按钮</as-button>
  <as-button type="primary" plain disabled>主要按钮</as-button>
  <as-button type="success" plain disabled>成功按钮</as-button>
  <as-button type="info" plain disabled>信息按钮</as-button>
  <as-button type="warning" plain disabled>警告按钮</as-button>
  <as-button type="danger" plain disabled>危险按钮</as-button>
</div>
```
:::

### 文字按钮

没有边框和背景色的按钮。

:::demo
```html
<as-button type="text">文字按钮</as-button>
<as-button type="text" disabled>文字按钮</as-button>
```
:::

### 图标按钮

带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。

:::demo 设置`icon`属性即可，icon 的列表可以参考 asement 的 icon 组件，也可以设置在文字右边的 icon ，只要使用`i`标签即可，可以使用自定义图标。

```html
<as-button type="primary" icon="as-icon-edit"></as-button>
<as-button type="primary" icon="as-icon-share"></as-button>
<as-button type="primary" icon="as-icon-dasete"></as-button>
<as-button type="primary" icon="as-icon-search">搜索</as-button>
<as-button type="primary">上传<i class="as-icon-upload as-icon--right"></i></as-button>
```
:::

### 按钮组

以按钮组的方式出现，常用于多项类似操作。

:::demo 使用`<as-button-group>`标签来嵌套你的按钮。

```html

```
:::
