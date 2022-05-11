为复杂应用打包小片段JS代码

支持打包不同的格式

- 全局变量污染
- 变量私有化
- 可拓展性
- 引入顺序问题





服务器端

nodejs 使得js能够在服务器端运行，在桌面端运行，在操作系统上运行

js语言就可以写一个web服务器，如express、koa、egg等web服务器框架

js语言本身没有模块化规范，不能引入导出文件，所以nodejs基于commonJS实现了模块化

es6引入了js模块化

在es6之前，浏览器又没有模块化，所以出现了AMD规范，异步加载模块，保证浏览器不卡死。

commonJS（cjs）模块化与AMD模块化两者不兼容，所以又出现了UMD模块。不兼容指的是cjs模块无法在浏览器中运行，AMD模块无法在nodejs中运行。而UMD模块可以在两者中运行。



浏览器端

AMD(asynchronous module definition)



IIFE( immediately-invoked function  expression)

立即执行函数

在函数定义表达式后立即调用

加上括号包裹函数体，让js引擎将此括号内的函数理解为一个函数表达式。

函数会被立即调用，新建一个调用堆栈。此堆栈可以访问外部变量，外部不可访问此函数的内部变量，从而实现了变量的私有化。

```
(function () {
	...
})() 
```

放大模式（augmentation）

在使用IIFE时传入参数

```
(function (a) {
	...
})(a) 
```



Rollup可以将模块打包为cjs、es6、AMD、UMD任一格式模块。

通过命令行使用

打包为AMD模块供浏览器使用

rollup main.js --file bundle.js --format iife

打包为cjs模块在node中使用

rollup main.js --file bundle.js --format cjs

打包为UMD在浏览器和node中使用

rollup main.js --file bundle.js --format umd --name "mybundle"





配置文件

配置文件使用es6模块格式编写，向外导出一个配置对象。通常放置项目根目录rollup.config.js。







通过JS api使用



参考文档

[说不清rollup能输出哪6种格式😥差点被鄙视 - 掘金 (juejin.cn)](https://juejin.cn/post/7051236803344334862)