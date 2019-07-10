<template>
  <div class="common-navs" v-if="navs && navs.length">
    <div class="nav-title">目录标题</div>
    <ul class="nav-list" @click="handleAnchor">
      <li class="nav-item"
        v-for="(item, index) in navs"
        :id="item.link"
        :class="['w' + item.tag, {'active': $route.hash && item.id.includes($route.hash)}]"
        :style="{ paddingLeft: (item.tag * 8) + 'px' }"
        :key="index">
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
export interface NavType {
  tag: number;
  id: string;
  label: string;
  link: string;
}

@Component
export default class CommonNavs extends Vue {
  @Prop() private navs: NavType[];

  private handleAnchor(event: any) {
    window.location.href = event.target.getAttribute('id');
  }
}
</script>

<style lang="scss" scoped>
.common-navs {
  position: fixed;
  right: 20px;
  top: 80px;
  width: 160px;
  .nav-title {
    font-size: 13px;
    margin-bottom: 12px;
  }
  .nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 0;
    border-left: 1px solid mix(#009688,#ffffff, 10%);
  }
  .nav-item {
    display: block;
    list-style: none;
    font-size: 12px;
    line-height: 28px;
    cursor: pointer;
    &.w2 {
      font-size: 13px;
      font-weight: 500;
    }
    &.w3 {
      font-size: 12px;
      font-weight: 400px;
    }
    &.w4, &.w5 {
      font-size: 12px;
      font-weight: normal;
    }
    &.active {
      transition: all .3s ease;
      position: relative;
      color: #009688;
      &::before {
        position: absolute;
        content: ' ';
        width: 5px;
        height: 5px;
        border-radius: 50%;
        border: 2px solid #009688;
        left: -5px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
