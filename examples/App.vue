<template>
  <div class="asui-index">
    <common-header></common-header>
    <div class="asui-main">
      <common-menu></common-menu>
      <router-view></router-view>
      <common-navs v-if="navs && navs.length" :navs="navs"></common-navs>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import CommonHeader from './common/common-header.vue';
import CommonMenu from './common/common-menu.vue';
import CommonNavs, { NavType } from './common/common-navs.vue';
import { getElementPosition } from '@src/utils';

@Component({
  components: {
    CommonHeader,
    CommonMenu,
    CommonNavs
  }
})
export default class Index extends Vue {
  private navs: NavType[] = [];

  private loadNavList(navRoot: Element) {
    const children = (navRoot && navRoot.children || []) as HTMLCollection;
    const list: NavType[] = [];

    for (let i = 0, len = children.length; i < len; i++) {
      const ele = children[i];
      const tagName = ele && ele.tagName;
      if (ele && ['H1', 'H2', 'H3', 'H4'].includes(tagName)) {
        const anchor = ele.querySelector('a.header-anchor');
        const link = anchor.getAttribute('href');

        list.push({
          tag: Number(tagName.substring(1)),
          id: tagName.toLowerCase() + '#' + ele.id,
          label: ele.textContent.split(' ')[0],
          link
        });
      }
    }

    this.navs = list;
  }

  private handleScroll() {
    const navRoot = document.querySelector('.content.as-ui-demos');
    const navs = this.navs;

    if (!!navRoot && navs && navs.length === 0) {
      this.loadNavList(navRoot);
    }

    // 获取所有的nav位置
    if (navRoot && navs && navs.length) {
      const eles = navs.map(nav => nav.id);

      for (let i = 0, len = eles.length; i < len; i++) {
        const anchor = eles[i];
        const ele = navRoot.querySelector(anchor) as HTMLElement;

        if (!ele) {
          return;
        }

        const pos = getElementPosition(ele, { x: 0, y: 80 });
        const winTop = window.pageYOffset
          || document.documentElement.scrollTop
          || document.body.scrollTop;

        if (pos.y > winTop - 10 && pos.y < winTop + 10) {
          const href = window.location.href;
          const hash = anchor.split('#')[1];
          const endIndex = href.match(/#/g).length > 1 ? href.lastIndexOf('#') : href.length;
          const base = href.substring(0, endIndex);

          if (!href.endsWith(hash) && base) {
            window.location.href = base + '#' + hash;
          }
        }
      }
    }
  }

  private mounted() {
    window.addEventListener('scroll', this.handleScroll, false);
  }

  private beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }
}
</script>

<style lang="scss">
.asui-index {
  background: #fafafa;
}
.asui-main {
  position: relative;
  top: 20px;
  margin-top: 60px;
  .common-menu {
    position: fixed;
    top: 80px;
    height: 100%;
    width: 200px;
  }
  .content {
    margin-left: 230px;
    margin-right: 180px;
    padding: 20px 16px;
    background: #ffffff;
    box-shadow: 0 3px 10px 0 rgba(74, 78, 74, .08);
  }
}
.container {
  width: 1200px;
  margin: 0 auto;
}
a {
  color: #009688;
  text-decoration: none;
}

code {
  background-color: #f9fafc;
  padding: 0 4px;
  border: 1px solid #eaeefb;
  border-radius: 4px;
}

button, input, select, textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
}

.hljs {
  line-height: 1.8;
  font-size: 12px;
  padding: 18px 24px;
  border: solid 1px #eaeefb;
  margin-bottom: 25px;
  border-radius: 4px;
  -webkit-font-smoothing: auto;
}

.content {
  padding: 20px 16px;
  h2 {
    font-size: 28px;
    color: #1f2d3d;
    margin: 0;
  }
  h3 {
    font-size: 22px;
  }
  h2, h3, h4, h5 {
    font-weight: normal;
    color: #1f2f3d;
    &:hover a {
      opacity: .4;
    }
    a {
      opacity: 0;
      cursor: pointer;
      &:hover {
        opacity: .4;
      }
    }
  }
  p {
    font-size: 14px;
    color: #5e6d82;
    line-height: 1.5em;
  }
  .tip {
    padding: 8px 16px;
    background-color: #ECF8FF;
    border-radius: 4px;
    border-left: #009688 5px solid;
    margin: 20px 0;

    code {
      background-color: rgba(255, 255, 255, .7);
      color: #445368;
    }
  }
  .warning {
    padding: 8px 16px;
    background-color: #fff6f7;
    border-radius: 4px;
    border-left: #FE6C6F 5px solid;
    margin: 20px 0;
    code {
      background-color: rgba(255, 255, 255, .7);
      color: #009688;
    }
  }
}
.demo {
  margin: 20px 0;
}
@media (max-width: 1140px) {
  .container,
  .page-container {
    width: 100%;
  }
}
@media (max-width: 768px) {
  .container,
  .page-container {
    padding: 0 20px;
  }

  #app.is-component .headerWrapper .container {
    padding: 0 12px;
  }
}
.flex {
  display: flex;
}
</style>
