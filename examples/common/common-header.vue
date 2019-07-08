<template>
  <div class="common-header">
    <div class="container flex">
      <div class="header-logo" @click="$router.push('/')">
        <img src="../assets/logo.png" alt="">
        <label for="">A Senior UI By Vue2.0+</label>
      </div>
      <div class="header-menu">
        <ul class="menu-list">
          <li v-for="(item, index) in menu" :class="{'active': active === item.label}" :key="index" @click="goLink(item)">{{item.label}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

interface MenuType {
  label: string;
  link: string;
}

@Component
export default class CommonHeader extends Vue {
  private active: string = 'UI库';
  private menu: MenuType[] = [
    {
      label: 'UI库',
      link: ''
    },
    {
      label: '资源',
      link: '/source'
    },
    {
      label: '博客',
      link: '/blog'
    }
  ];

  private goLink(item: MenuType) {
    this.active = item.label;
    this.$router.push(item.link);
  }
}
</script>

<style lang="scss" scoped>
.common-header {
  width: 100%;
  height: 60px;
  line-height: 60px;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  z-index: 99;
  background: #393D49;
  .header-logo {
    display: flex;
    align-items: center;
    > label {
      position: relative;
      top: 12px;
      font-size: 14px;
      color: rgba($color: #ffffff, $alpha: .7);
      transition: all .3s ease-in-out;
      &:hover {
        color: #ffffff;
        font-size: 16px;
        cursor: pointer;
      }
    }
    img {
      width: 36px;
      height: 36px;
    }
  }
  .header-menu {
    flex: 1;
    .menu-list {
      margin: 0;
      padding: 0;
      overflow: auto;
      list-style: none;
      li {
        line-height: 56px;
        float: right;
        margin-left: 12px;
        padding: 0 12px;
        font-size: 14px;
        border-bottom: 4px solid transparent;
        transition: all .3s ease-in;
        color: rgba($color: #ffffff, $alpha: .7);
        cursor: pointer;
        &.active {
          color: #ffffff;
          font-size: 1.1em;
          border-bottom-color:#009688;
        }
        &:hover {
          color: #ffffff;
          font-size: 1.1em;
        }
      }
    }
  }
}
</style>
