import { defineConfig } from 'dumi';

export default defineConfig({
 
  exportStatic: {}, // 将所有路由输出为 HTML 目录结构，以免刷新页面时 404
  resolve: {
    includes: ['docs'],
  },
  title: 'webc',
  favicon: 'https://avatars.githubusercontent.com/u/108705856?s=200&v=4',
  logo: 'https://avatars.githubusercontent.com/u/108705856?s=200&v=4',
  outputPath: 'docs-dist',
   navs: [
    {
      title: "指南",
      path: "/doc",
    },
    {
      title: '更新日志',
      path: '/changelog',
    },
    {
      title: "playground",
      path: "/playground",
      children: [
        { title: "UI", path: "/playground/ui" },
      ],
    },
  ],
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
  ],
  theme: {
    '@primary-color': '#0840f8',
    '@c-primary': '#0840f8',
  },
  // more config: https://d.umijs.org/config
});
