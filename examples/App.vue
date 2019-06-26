<template>
  <div class="asui-index">
    <common-header></common-header>
    <div class="asui-main">
      <common-menu></common-menu>
      <div class="asui-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import CommonHeader from './common/common-header.vue';
import CommonMenu from './common/common-menu.vue';

@Component({
  components: {
    CommonHeader,
    CommonMenu
  }
})
export default class Index extends Vue {

}
</script>

<style lang="scss">
.asui-main {
  margin-top: 80px;
  display: flex;
  .common-menu {
    width: 200px;
    flex: 0 0 200px;
  }
  .asui-content {
    flex: 1;
    padding: 20px 16px;
    background: #ffffff;
    box-shadow: 0 3px 10px 0 rgba(74, 78, 74, .08);
  }
}
.container {
  width: 1200px;
  margin: 0 auto;
}
.flex {
  display: flex;
}
</style>
