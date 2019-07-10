<template>
  <div class="common-menu">
    <div class="menu-scroller">
      <ul class="menu-list">
        <menu-item
          :item="item"
          v-for="(item, index) in routes"
          :key="index"/>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';
import MenuItem from './menu-item.vue';

@Component({
  components: {
    MenuItem
  }
})
export default class CommonMenu extends Vue {
  @Prop() private routes: RouteConfig[];
}
</script>

<style lang="scss" scoped>
.common-menu {
  background: #ffffff;
  padding: 16px 12px;
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
}
</style>
