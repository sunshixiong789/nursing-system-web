/**
 * @author sunshixiong
 * 此配置主要使用antd提供的react-app-rewired实现create-react-app自定义
 * 配置，使用ts-import-plugin实现包的按需加载，import的时候就可以用{xxx}导入
 */

const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@layout-header-background": "#253657",
      "@menu-collapsed-width": "60px",
      "@menu-dark-bg": "rgba(37, 53, 85, 0.65)",
      "@menu-dark-submenu-bg": "#2b3d5b",
      "@primary-color": "#253657"
    }
  })
);
