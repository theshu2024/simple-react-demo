const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const sassRegex = /\.(scss|sass)$/;
const cssRegex = /\.css$/;

const styleLoadersArray = [
  "style-loader", // 开发环境使用style-looader,打包模式抽离css
  {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: "[path][name]__[local]--[hash:5]",
      },
    },
  }
];

const port = 3050;

const config = {
  entry: path.join(__dirname, "./src/index.tsx"), // 入口文件
  output: {
    path: path.resolve(__dirname, "dist"), // 输出目录
    filename: "bundle.js", // 打包后文件名
    publicPath: "/", // 打包后文件的公共前缀路径
  },
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/, // 匹配 .js 和 .jsx 文件
        exclude: /node_modules/,
        // 使用 Babel + 多进程构建
        use: ["babel-loader"],
      },
      {
        test: cssRegex, // 匹配 css 文件
        use: styleLoadersArray,
      },
      {
        test: sassRegex,
        use: [
          ...styleLoadersArray,
          "sass-loader"
        ],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    })
  ],
  // 自动解析扩展名
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias:{
      "@app": path.resolve(__dirname, "../src/components"),
    },
  },
  devServer: {
    port,
    open: false, // 是否自动打开
  },
};;

module.exports = config;
