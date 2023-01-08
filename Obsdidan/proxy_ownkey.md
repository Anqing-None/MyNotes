## ownKeys
ownKeys是[[OwnPropertyKeys]]内部方法的拦截器，[[OwnPropertyKeys]]内部方法返回了一个列表，包含了所有属性。Object.keys方法判断每个属性的属性描述符，决定是否返回该属性。

`Object.keys()`能够获取一个对象的所有属性，并以数组形式返回。
- `Object.keys`方法不返回类型为Symbol的属性
```javascript
> let id = Symbol("id");
> let obj = {id:123};
> obj[id] = 456;
> obj[id]
456
> obj["id"]
123
> Object.keys(obj)
[ 'id' ]
```
- `Object.keys` 仅返回带有 `enumerable` 标志的属性。
所以`Object.keys`方法内部会调用[[GetOwnProperty]]来获取属性的描述符，从而决定是否返回该属性。ownKeys拦截器可在访问属性描述符时进行拦截。


getOwnPropertyDescriptor是[[GetOwnProperty]]内部方法的拦截器，[[GetOwnProperty]]用于访问某一个属性的属性描述符。Object.keys方法在得到[[OwnPropertyKeys]]内部方法返回的属性列表后，会再调用[[GetOwnProperty]]内部方法获取属性的描述标识符是否有enumerable属性。


从语言层面思考如何描述一个对象的属性？
let a = {property:value};
一个对象属性是否可以被修改
一个对象属性是否可以被循环输出
一个对象属性是否可以被修改配置，也就是修改上述两项配置
如何描述property呢？
{
	writable: true,
	enumerable: true,
	configurable: true,
	value: value
}



