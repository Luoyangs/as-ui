exports.packageIndex = {
  path: 'packages/index.ts',
  temps: [
    `
    <% for %>
      export { default as <%COMPONENT%> } from './<%component%>';
    <% /for %>
    `
  ]
}

exports.typingIndex = {
  path: 'types/as-ui.d.ts',
  temps: [
    `
    <% for %>
      export { default as <%COMPONENT%> } from './<%component%>';
    <% /for %>
    `
  ]
}

exports.examplesTyping = {
  path: 'examples/typing.d.ts',
  temps: [
    `
    declare module 'as-ui' {
      <% for %>
        import <%COMPONENT%> from 'as-ui/<%component%>';
      <% /for %>
      export {
        <% for %>
        <%COMPONENT%>
        <% /for %>
      }
    }
    `
  ]
}

exports.examplesRouter = {
  path: 'examples/router.ts',
  temps: [
    `
    export const componentsRouteConfig = [{
      <% for %>
      path: '/<%component%>',
      name: '<%component%>',
      component: () => import(/* webpackChunkName: "<%component%>" */ './components/<%component%>.vue')
      <% for-not-last %>
    },{
      <% /for %>
    }];
    `
  ]
}

exports.index = {
  path: 'src/index.ts',
  temps: [
    `
    import {
      <% for %>
      <%COMPONENT%>,
      <% /for %>
    } from '../packages';
    `,
    `
    export {
      <% for %>
      <%COMPONENT%>,
      <% /for %>
    };
    `,
    `
    const components = [
      <% for %>
      <%COMPONENT%>,
      <% /for %>
    ];
    `
  ]
}
