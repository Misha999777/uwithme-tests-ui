const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const {InjectManifest} = require("workbox-webpack-plugin");

const babelLoader = {
  loader: "babel-loader",
  options: {
    presets: [
      ["@babel/preset-react", {runtime: "automatic"}]
    ]
  }
}
const splitChunks = {
  cacheGroups: {
    styles: {
      test: /\.css$/,
      enforce: true
    }
  }
}

module.exports = (env, argv) => {
  return {
    stats: "minimal",
    devtool: "source-map",
    performance: {
      maxEntrypointSize: Math.pow(1024, 2),
      maxAssetSize: Math.pow(1024, 2)
    },
    entry: {
      index: "./src/index.jsx"
    },
    output: {
      clean: true,
      path: path.join(__dirname, "/build"),
      filename: "js/[name].[contenthash:8].js",
      chunkFilename: "js/[name].[contenthash:8].chunk.js",
      assetModuleFilename: "media/[name][ext]"
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].chunk.css"
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html"
      }),
      new CopyWebpackPlugin({
        patterns: [{
          from: "./public",
          globOptions: {ignore: ["**/index.html"]},
          noErrorOnMissing: true
        }]
      }),
      argv.mode === "production" &&
      new InjectManifest({
        swSrc: "./src/sw.js"
      })
    ],
    resolve: {
      extensions: [".js", ".jsx"]
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: babelLoader
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"]
        },
        {
          test: /\.(png|svg)$/,
          type: "asset/resource"
        }
      ]
    },
    optimization: {
      minimizer: [
        new TerserWebpackPlugin({
          extractComments: false
        }),
        new CssMinimizerPlugin()
      ],
      splitChunks: splitChunks
    },
    devServer: {
      port: 3000,
      historyApiFallback: true
    }
  }
}