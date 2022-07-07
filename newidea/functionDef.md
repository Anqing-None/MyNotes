# JS函数表达式与函数声明写法的区别
在Javascript中定义函数有多种方法
函数声明写法（Function Declaration）
```javascript
function add(...args) {
	return args.reduce((preValue,curValue)=> preValue + curValue,0)
}
```
函数表达式（Function expression）
```javascript
let add = function (...args) {
	return args.reduce((preValue,curValue)=> preValue + curValue,0)
}
```
两者的区别在于什么时候可以调用该函数。
函数声明写法可以在函数代码位置定义之前就可以调用。
```javascript
console.log(add(1,2));
function add(...args) {
	return args.reduce((preValue,curValue)=> preValue + curValue,0)
}

// 3
```
函数表达式定义的函数在表达式之后才可以调用
```javascript
console.log(add(1,2));
let add = function (...args) {
	return args.reduce((preValue,curValue)=> preValue + curValue,0)
};

// Uncaught ReferenceError: add is not defined
```