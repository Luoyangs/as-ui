<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Empty extends Vue {
  private renderAnchorHref() {
    const anchors = document.querySelectorAll('h2 a, h3 a, h4 a, h5 a');
    const basePath = location.href.split('#').splice(0, 2).join('#');

    Array.from(anchors).forEach((a: HTMLLinkElement) => {
      let href = a.getAttribute('href');
      href = href.substring(href.lastIndexOf('#'));
      a.href = basePath + href;
    });
  }

  private updated() {
    this.renderAnchorHref();
  }
}
</script>
