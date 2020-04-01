const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  outputDir: "dist",
  assetsDir: "assets",
  productionSourceMap: false,
  filenameHashing: false,
  lintOnSave: false,
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()]
  },
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 8000,
    https: false,
    hotOnly: false,
    /* 使用代理 */
    proxy: {
      "/api": {
        /* 目标代理服务器地址 */
        target: "http://47.100.47.3/",
        /* 允许跨域 */
        changeOrigin: true
      }
    }
  }
};
