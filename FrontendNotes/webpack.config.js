// 引入nodejs中内置模块path
const path = require('path')
// 引入html-webpack-plugin，将js文件自动引入到html文件中
const HtmlWebpackPlugin = require('html-webpack-plugin')
// MiniCssExtractPlugin将css打包到文件中并在html中引入
// 如何知道插入到哪个HTML文件？
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 引入压缩css代码的插件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  // 定义入口文件
  entry: path.resolve("./src/index.js"),
  // 打包文件输出位置
  output: {
    // 指定输出文件文件名
    filename: "anqing.js",
    // 指定输出路径，使用绝对路径
    path: path.resolve('./dist'),
    // 每次打包后清理上一次打包残留
    clean: true,
    // 设置模块打包后生成的路径及文件名
    // [contenthash]是文件内容的哈希码，[ext]是文件扩展至，相对于webpack中的变量
    assetModuleFilename:"images/[contenthash][ext]"
  },
  // 指定打包模式
  mode: 'production',
  // 开发调式
  devtool:'inline-source-map',
  // 引入插件
  plugins: [
    // 引入html插入
    new HtmlWebpackPlugin({
      // 依据哪个模板插入打包文件
      template: "./index.html",
      // 插入后生成的html文件名
      filename: "anqing.html",
      // 指定代码插入位置
      inject: "body"
    }),
    new MiniCssExtractPlugin({
      //指定生成的css文件名及路径
      filename: 'style/[contenthash].css'
    }),
  ],

  // 配置webpack-dev-server,devserver是用来测试已经打包好的html文件
  devServer: {
    //开发时服务器读取的目录
    static:"./dist"
  },
  
  module: {
    // 配置模块规则，loader等，值为数组，数组为多个配置对象
    rules: [
      {
        // 条件，使用正则匹配png图片
        test: /\.png$/,
        // 指定类型，有asset/resource、'asset/inline'
        type: 'asset/resource',
        generator: {
          filename:'images/[contenthash][ext]',
        }
      },
      {
        test: /\.svg$/,
        // 以base64嵌入网页
        type: 'asset/inline'
      },
      {
        test: /\.md$/,
        // 以raw格式导出
        type: 'asset/source'
      },
      {
        test: /\.jpg$/,
        // 以raw格式导出
        type: 'asset',
        //  不指定generator，使用output中的assetModuleFilename配置，根据文件大小决定是否inline
        parser: {
          dataUrlCondition: {
            // 文件最大大小默认值为 4 * 1024 = 4KB
            maxSize: 4 * 1024 * 1024
          }
        }
      },
      {
        test: /\.(css|less)$/,
        // 解析文件，解析顺序从后之前，less-loader先解析less文件，结果传递至css-loader，结果再传递到style-loader
        use: [MiniCssExtractPlugin.loader,'css-loader','less-loader']
      }
    ]
  },
  optimization: {
    minimizer:[
      new CssMinimizerPlugin()
    ]
  }
}