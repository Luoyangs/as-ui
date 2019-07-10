<template>
  <li class="menu-item">
    <span v-if="item.children"
      class="text"
      :class="{'active': $route.name === item.name || item.children.some(it => it.name === $route.name) }">{{ item.name }}</span>
    <span v-else
      class="link"
      :class="{'active': $route.name === item.name }"
      @click="$router.push(`${(parent ? (parent.path + '/') : '') + item.path}`)">{{ item.name }}</span>

    <ul class="menu-list" v-if="item.children">
      <menu-item :item="sub"
        :parent="item"
        v-for="(sub, index) in item.children"
        :key="index"/>
    </ul>
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class MenuItem extends Vue {
  @Prop() private item: any;
  @Prop() private parent: any;
}
</script>

<style lang="scss" scoped>
.menu-item {
  padding: 0;
  .menu-list {
    padding: 0;
    margin: 0;
  }
  .text {
    color: #333;
    font-size: 14px;
    font-weight: 600;
    padding: 12px 0;
    &.active {
      color: #009688;
    }
  }
  .link {
    display: block;
    cursor: pointer;
    font-size: 12px;
    color: #444;
    line-height: 24px;
    padding: 12px 0;
    padding-left: 16px;
    &.active {
      background: mix(#009688,#ffffff, 10%);
      color: #009688;
    }
    &:hover:not(.active) {
      color: #009688;
    }
  }
}
</style>
