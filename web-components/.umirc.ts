import { defineConfig } from 'dumi';
const path = require('path')
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
  // chainWebpack(config) {
  //   const rule = config.module.rule('compile')
      
  //   rule.uses.clear()
  //   rule.test(/\.less$/i)
  //     .include
  //     .add(path.resolve(__dirname, 'packages'))
  //     .end()
  //     .rule('myRule')
  //           //先创建一个具名的use，后面修改有用到这个名称
  //           .use('styleloader')
  //               .loader('style-loader')
  //               .end()
  //           .use('cssloader')
  //               .loader('css-loader')
  //               .options({
  //                 modules: true,
  //                 importLoaders: 1
  //               })
  //               .end()

  //           .use('lessloader')
  //               .loader('less-loader')

  // }
  // lessLoader: {
    // webpackImporter: true
    // localIdentName:'[local]',  // 配置这行
    // importLoaders: 1,
    // modules: true,
    // importLoaders: 1
    // localIdentName: '[local]',
    // modifyVars: { 
    //   "@ant-prefix": "ant",
    // },
   
    //   test: /\.less$/,
    //   use: [{
    //       loader: "style-loader" // creates style nodes from JS strings
    //   }, {
    //       loader: "css-loader" // translates CSS into CommonJS
    //   }, {
    //       loader: "less-loader" // compiles Less to CSS
    //   }]
 
    // test: /\.less$/,
    // use: [
    //   'style-loader',
    //   { loader: 'css-loader', options: { importLoaders: 1 } },
    //   'less-loader'
    // ]
  // }
});
