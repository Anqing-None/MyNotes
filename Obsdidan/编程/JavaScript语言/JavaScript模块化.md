
## IIFE
立即执行函数
函数申明立即执行，函数内部状态由于作用域scope，达到不暴露内部变量的目的。

## CommonJS(CJS)
Node.js的模块化实现

## AMD
Asynchronous Module Definition，异步模块加载

## UMD
Universal Module Definition，同时支持CJS与AMD

## ESM
ECMA规范，未来趋势
在node环境中使用es module：
在package.json中指定以下字段
```json
{
  "type": "module"
}
```
## package.json
npm包package.json的main字段与module字段

```json
{
  "main":"dist/package.umd.js"
}
```

当使用`const package = require("package")`时，使用main字段指定的路径引入包，不支持treeshake。


```json
{
  "module":"dist/package.esm.js"
}
```

当使用`import package from "package"`时，使用module字段指定的路径引入包，支持treeshake。

## rollup

### @rollup/plugin-node-resolve
当项目依赖一个npm包时，此插件用于寻找node_modules中的模块，模块必须支持esm。

### @rollup/plugin-commonjs
当项目不支持esm时，需要使用此插件将CJS模块转换为ESM模块。
