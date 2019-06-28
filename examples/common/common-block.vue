<template>
  <div class="common-demo-block">
    <div class="source">
      <slot name="source"></slot>
    </div>
    <div class="meta">
      <div class="desc">
        <slot></slot>
      </div>
      <div class="highlight">
        <slot name="highlight"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class CommonDemoBlock extends Vue {

  private renderAnchorHref() {
    const anchors = document.querySelectorAll('h2 a, h3 a, h4 a, h5 a');
    const basePath = location.href.split('#').splice(0, 2).join('#');

    Array.from(anchors).forEach((a: HTMLLinkElement) => {
      let href = a.getAttribute('href');
      href = href.substring(href.lastIndexOf('#'));
      a.href = basePath + href;
    });
  }

  private goAnchor() {
    if (location.href.match(/#/g).length > 1) {
      const anchor = location.href.match(/#[^#]+$/g);
      if (!anchor) {
        return;
      }

      const ele = document.querySelector(anchor[0]);
      if (!ele) {
        return;
      }

      window.setTimeout(() => {
        window.scrollTo(0, ele.scrollTop);
      });
    }
  }

  private beforeRouteUpdate(to: any, from: any, next: any) {
    console.log('beforeRouteUpdate');

    // next();
    // setTimeout(() => {
    //   if (location.href.match(/#/g).length < 2) {
    //     document.documentElement.scrollTop = document.body.scrollTop = 0;
    //     this.renderAnchorHref();
    //   } else {
    //     this.goAnchor();
    //   }
    // }, 100);
  }

  private mounted() {
    this.renderAnchorHref();
    this.goAnchor();
  }
}
</script>
