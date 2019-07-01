<template>
  <div class="common-demo-block"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false">
    <div class="source">
      <slot name="source"></slot>
    </div>
    <div class="meta" :style="{ height: isExpanded ? 0: 'auto' }">
      <div class="desc">
        <slot></slot>
      </div>
      <div class="highlight">
        <slot name="highlight"></slot>
      </div>
    </div>
    <div
      class="demo-block-control"
      ref="control"
      @click="isExpanded = !isExpanded">
      <transition name="arrow-slide">
        <span v-if="!hovering">...</span>
      </transition>
      <transition name="text-slide">
        <span v-show="hovering">{{ isExpanded ? '显示代码' : '隐藏代码' }}</span>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component
export default class CommonDemoBlock extends Vue {
  private isExpanded: boolean = true;
  private hovering: boolean = false;

  private renderAnchorHref() {
    const anchors = document.querySelectorAll('h2 a, h3 a, h4 a, h5 a');
    const basePath = location.href.split('#').splice(0, 2).join('#');

    Array.from(anchors).forEach((a: HTMLLinkElement) => {
      let href = a.getAttribute('href');
      href = href.substring(href.lastIndexOf('#'));
      a.href = basePath + href;
    });
  }

  private mounted() {
    this.renderAnchorHref();
  }
}
</script>

<style lang="scss">
.common-demo-block {
  border: solid 1px #ebebeb;
  border-radius: 3px;
  transition: 0.2s;
  &:hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
  }
  code {
    font-family: Menlo, Monaco, Consolas, Courier, monospace;
  }
  .demo-button {
    float: right;
  }
  .source {
    padding: 24px;
  }
  .meta {
    background-color: #fafafa;
    border-top: solid 1px #eaeefb;
    overflow: hidden;
    height: 0;
    transition: height 0.2s;
  }
  .desc {
    padding: 20px;
    box-sizing: border-box;
    border: solid 1px #ebebeb;
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    color: #666;
    word-break: break-word;
    margin: 10px;
    background-color: #fff;
    p {
      margin: 0;
      line-height: 26px;
    }
    code {
      margin: 0 4px;
      display: inline-block;
      padding: 1px 5px;
      font-size: 12px;
      border-radius: 3px;
      height: 18px;
      line-height: 18px;
    }
  }
  .highlight {
    pre {
      margin: 0;
    }
    code.hljs {
      margin: 0;
      border: none;
      max-height: none;
      border-radius: 0;
      &::before {
        content: none;
      }
    }
  }
  .demo-block-control {
    border-top: solid 1px #eaeefb;
    height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
    position: relative;
    &.is-fixed {
      position: fixed;
      bottom: 0;
      width: 868px;
    }
    i {
      font-size: 16px;
      line-height: 44px;
      transition: 0.3s;
      &.hovering {
        transform: translateX(-40px);
      }
    }
    > span {
      position: absolute;
      transform: translateX(-30px);
      font-size: 14px;
      line-height: 44px;
      transition: 0.3s;
      display: inline-block;
    }
    &:hover {
      color: #409eff;
      background-color: #f9fafc;
    }
    & .text-slide-enter, & .text-slide-leave-active {
      opacity: 0;
      transform: translateX(10px);
    }
    .control-button {
      line-height: 26px;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 14px;
      padding-left: 5px;
      padding-right: 25px;
    }
  }
}
</style>
