exports.entry = {
  path: 'packages/<%component%>/index.ts',
  temps: [
    `
    import <%COMPONENT%> from './src/<%COMPONENT%>.vue';
    import { createPackage } from '@src/core';

    export default createPackage(<%COMPONENT%>);
    `
  ]
}

exports.page = {
  path: 'packages/<%component%>/src/<%COMPONENT%>.vue',
  temps: [
    `
    <template>

    </template>

    <script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component({
      name: '<%COMPONENT%>'
    })
    export default class <%COMPONENT%> extends Vue {

    }
    </script>

    <style lang="scss" scoped>

    </style>
    `
  ]
}

exports.readme = {
  path: 'packages/<%components%>/README.md',
  temps: [
    `

    `
  ]
}
