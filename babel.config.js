const path = require('path');
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")


module.exports = function (api) {
    api.cache(true);
    return {
      plugins: [
        'macros',
        // new NodePolyfillPlugin()
      ],
      resolve: {
        fallback: {
          "crypto": require.resolve("crypto-browserify"),
          "path": require.resolve("path-browserify"),
          "os": require.resolve("os-browserify/browser")
        },
      },
    }
  }
  