# webpack 学习笔记

webpack是一个打包工具，用于打包js模块。

模块化开发极利于开发复杂项目。

webpack通过一个入口文件，分析依赖，将其打包为一个或者多个文件。开发者无需关心模块的依赖关系，便可以更好的提高开发效率。


入口
默认为项目根目录./src/index.js
通过这个文件寻找所有依赖
配置选项中使用entry来指定入口
``` js
webpack.config.js
module.exports = {
  entry: './path/to/my/entry/file.js',
};
```


loader
loader用于转换模块的源代码，比如ts->js,css=>预处理器



plugin
插件
插件用于压缩代码
编译Vue模版等复杂任务

mode
打包模式
development 开发模式
production 生产模式

配置


