

首先来复习一下JS的面向对象实现。
原生JS的类

构造函数
构造函数一般以大写字母开头，使用new关键字调用。

```js
function Marker(latlng, options) {
this.latlng = latlng;
this.options = options;
}

const marker = new Marker([0, 0],{})

```

new 关键字调用Marker函数的执行过程大概是这样的：

```js
function Marker(latlng, options) {
// const this = {} 隐式创建
this.latlng = latlng;
this.options = options;
// return this; 隐式返回
}
```

Marker类是一个函数，同时也是一个对象，它有一个prototype属性，Marker.prototype是一个对象，称为原型。

Marker.prototype原型对象中有一个constructor，它指向Marker构造函数自身。
