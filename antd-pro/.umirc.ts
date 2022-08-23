import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'antd-pro',
  favicon:
    'https://avatars.githubusercontent.com/u/108705856?s=200&v=4',
  logo: 'https://avatars.githubusercontent.com/u/108705856?s=200&v=4',
  outputPath: 'docs-dist',
  mode: 'site',
  // more config: https://d.umijs.org/config
  extraBabelPlugins: [
    [
      "import",
      {
        libraryName: "antd",
        libraryDirectory: "es",
        style: true
      },
      "antd",
    ]
  ],
});
