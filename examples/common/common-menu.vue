<template>
  <div class="common-menu">
    <div class="menu-scroller">
      <ul class="menu-list">
        <li class="menu-item"
          :class="{'active': $route.name === item.name }"
          v-for="(item, index) in routes"
          :key="index"
          @click="$router.push(item.path)">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { componentsRouterConfig } from '../router';

@Component
export default class CommonMenu extends Vue {
  private routes = componentsRouterConfig.filter(item => !!item.name);
}
</script>

<style lang="scss" scoped>
.common-menu {
  margin-right: 16px;
  .menu-scroller {
    overflow-y: auto;
  }
  .menu-list, .menu-item {
    list-style: none;
    font-weight: normal;
  }
  .menu-list {
    margin: 0;
    padding: 0;
  }
  .menu-item {
    cursor: pointer;
    line-height: 40px;
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
