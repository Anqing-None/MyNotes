# webpack 学习笔记

webpack是一个打包工具，用于打包js模块。

模块化开发极利于开发复杂项目。

webpack通过一个入口文件，分析依赖，将其打包为一个或者多个文件。开发者无需关心模块的依赖关系，便可以更好的提高开发效率。

webpack 通过指定入口文件，自动引入依赖，打包代码。

## config 文件
webpack.config.js默认名称，放置于项目根目录，webpack命令运行时会自动使用此文件中的配置。

webpack.config.js本质上是一个CJS模块规范导出的一个对象。
配置对象的每个属性用于指定webpack打包代码的个性化配置。

入口
config.entry

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
> webpack自身只能理解js和json文件，其他文件需要转换为js或json。

loader用于转换模块的源代码，比如ts->js,css=>预处理器

配置loader使用config.module属性，config.module同样也是一个对象，如下
```js
config.module = {
  rules: [{test: /\.txt$/, use: 'raw-loader'},{}, ...]
}
```
rules:
是一个 数组对象，每个子对象都有两个属性，test是正则表达式，用于匹配文件名称，use是此类文件的预处理器。


plugin
> 插件可以完成一些自动化的任务，例如自动引入打包后的js代码到HTML文件/自动生成HTML模版。

插件也可以用于压缩代码，加密代码，编译Vue模版等复杂任务

mode
打包模式
development 开发模式
production 生产模式

配置


