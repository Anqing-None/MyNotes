# node.js事件模块events

node.js是事件驱动型语言。简单理解就是干完了一些活发出干完了事件，下一个工人再继续干活。举个例子，你在打代码，期间点了一份外卖，然后继续打代码，过了一会外卖员打你电话，说外卖到了，你再去拿。这个例子中，外卖员打你电话就是一个事件，这个事件告诉你，可以干饭了。

## events

events是node的内置模块，所以可以直接导入该模块`const Events = require('evetns');`。

引入模块后，得到EventEmitter构造函数。可以看到变量Events就是Events中的EventEmitter。
```javascript
const Events = require('events');
console.log(Events === Events.EventEmitter);// true
```

![[EventEmitter函数.png]]

构造函数需要使用new关键字来调用以得到一个EventEmitter实例对象。

调用实例方法
on可以监听一个事件
emit可以发出一个事件






