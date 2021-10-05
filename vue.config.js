module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: { "^/api": "/" },
      },
      "^/api/build-list": {
        target: "http://localhost:3000",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: { "^/api": "/build-list" },
      },
    },
  },
  configureWebpack: {
    plugins: [
      require("unplugin-element-plus/webpack")({
        // options
      }),
    ],
  },
};
