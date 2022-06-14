# Node.js基础模块笔记

## global

nodejs运行时的全局对象是global，浏览器下的全局对象是window

直接访问全局对象

```js
// index.js
console.log(global);

// node index.js
<ref *1> Object [global] {
  global: [Circular *1],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],       
  performance: Performance {
    nodeTiming: PerformanceNodeTiming {
      name: 'node',
      entryType: 'node',
      startTime: 0,
      duration: 44.54980000015348,
      nodeStart: 0.706500000320375,
      v8Start: 2.520899999886751,
      bootstrapComplete: 30.116500000469387,
      environment: 14.335200000554323,
      loopStart: -1,
      loopExit: -1,
      idleTime: 0
    },
    timeOrigin: 1653117196935.214
  },
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  }
}
```

在js文件内输出this关键字会得到一个空对象

```js
// index.js
console.log(this)
// {}
console.log(this === global);
// false
```

但如果在js文件内定义一个函数，打印函数内的this，会得到global

```js
function a() {
    console.log(this === global);
}

a();
// true
```

nodejs将每一个js文件视为一个独立的模块，每个模块都有自己的模块作用域。模块作用域的实现是使用JavaScript的IIFE立即调用函数来创建独立作用域。



如果要在REPL环境下访问global对象，直接打印this即可。

```js
Welcome to Node.js v16.14.0.      
Type ".help" for more information.
> golbal
Uncaught ReferenceError: golbal is not defined
> this
```

global对象上有许多属性与方法，REPL环境下没有__dirname等属性，因为它并非执行了js文件。所以无法判断当前js文件所在运行的目录。

`__filename`：返回正在执行的脚本的绝对路径



`__dirname`：返回正在执行的脚本的所在目录



timer类函数：执行顺序与事件循环间的关系



process：提供与当前进程互动的接口



require：导入模块

module、exports：导出模块





### process

获取进程信息，如运行环境、创建子进程...

在REPL中可以直接查看process对象中的属性与方法。

#### 资源

获取资源消耗信息：1.cpu 2.memory

##### 获取内存消耗信息

```js
console.log(process.memoryUsage());

// output
{
  rss: 24412160,     
  heapTotal: 4915200,
  heapUsed: 4027160, 
  external: 231317,  
  arrayBuffers: 11158
}
```

rss：常驻内存

heapTotal：申请的总内存

heapUsed：实际使用的内存

external：底层C++所用内存

arrayBuffers：缓冲区大小



##### CPU

```js
console.log(process.cpuUsage());

// output
{ user: 31000, system: 15000 }
```

user：用户占用时间

system：系统占用时间



#### 运行环境



运行目录、node环境、cpu架构、用户环境、系统平台

```js
console.log(process.cwd);

// D:\Users\anqing\Videos\nodeJS拉钩教育\code
console.log(process.version);

//16.14.0

console.log(process.vessions);
// node依赖包的版本

console.log(process.arch);

// X64

console.log(process.env);

// 系统的环境变量

console.log(process.env.NODE_ENV);

// undefined
// node的运行环境，一般由一些库进行设置。 production | development

console.log(process.env.USERPROFILE);

// C:\\Users\\anqing
// 用户资料目录，一些工具的配置文件都存放在这里，比如git的配置、或者是npmrc源配置
// USERPROFILE在Windows平台上使用，而Unix平台一般使用关键字HOME

console.log(process.platform);
// win32
// 判断用户操作系统
```



#### 运行状态

启动参数

```js
// index.js
console.log(process.argv);

PS node .\index.js i -g
[
  'C:\\Program Files\\nodejs\\node.exe',
  'D:\\Users\\anqing\\Videos\\nodeJS拉钩教育\\code\\04-node-global.js',
  'i',
  '-g'
]

```

argv是一个Array类型，默认会有2个值，第一个为node.exe所在绝对路径，第二个为运行的js文件所在绝对路径。后面则是调用node传入的参数。

`process.argv0`可访问node执行路径，但没有argv1。



PID

当前进程运行的pid

```js
console.log(process.pid);
```

运行时间

程序运行所消耗的时间

```js
console.log(process.uptime());
```





#### 事件

进程退出会触发相应事件。

退出

exit

beforeExit



#### 输入、输出



stdin

在命令行输入信息。在使用npm init时要输入包的相关信息，就使用stdin。

process.stdin

stdout

## path

path模块用于处理路径

获取文件后缀

获取文件目录

#### basename

`path.basename(path[,ext])`

`path`：路径字符串

`ext`：可选，文件后缀名字符串

basename函数接收一个文件路径字符串，返回文件名或者最后一层路径名，如果传入ext与文件名后缀匹配，则直接返回文件名。

获取路径的基础名称

```javascript
const path = require('path');

path.basename("D:\\foo.html");
// foo.html

path.basename("D:\\foo.html", ".html");
// foo

path.basename("D:\\foo.html", "ml");
// foo.ht

path.basename("D:\\foo\\bar\\");
// bar

path.basename("D:\\foo\\bar\\", 'r');
// ba
```





### Stream

流分为四类：

- `Readable`: 可以通过管道读取、但不能通过管道写入的流（可以接收数据，但不能向其发送数据）。 当推送数据到可读流中时，会对其进行缓冲，直到使用者开始读取数据为止，`fs.createReadStream()`。
- `Writable`: 可以通过管道写入、但不能通过管道读取的流（可以发送数据，但不能从中接收数据），`fs.createWriteStream()`。
- `Duplex`: 可以通过管道写入和读取的流，基本上相对于是可读流和可写流的组合，net.Socket。
- `Transform`: 类似于双工流、但其输出是其输入的转换的转换流，zlib.createDeflate()。

#### 可读流

创建一个可读流

`const readableStream = fs.readFile('read.txt')`

调用可读流的pipe方法，使其流向一个可写流

`readableStream.pipe(writableStream)`

### Buffer

IO的行为就是操作二进制数据，即0和1。

Stream流就是一堆0和1数据，过长的二进制数据不好传输，所以会将二进制数据分段传输。

数据发送者与数据接收者，生产和消费过程往往存在等待时间。

数据接收者在等待完整数据传输完毕，那在传输期间，数据会暂存Buffer中，中文名为缓冲区。实际上Buffer是一片内存空间。

Buffer是nodejs中的全局变量。

Buffer实现了在nodejs平台操作二进制数据功能。

V8引擎所占的内存空间于不包含Buffer所占内存空间。

Buffer的内存使用由nodejs来控制，垃圾回收机制也由V8的GC来控制。

Buffer一般配合Stream流来使用，充当数据的缓冲区。

实操：

#### 创建Buffer实例

在JS中一切皆对象，Buffer也是一个对象，三种方式创建Buffer实例。

#### alloc

创建指定字节大小的buffer

#### allocUnsafe

不安全的创建模式，所得的内存空间可能会有残留数据。

#### from

接收数据，创建buffer，存入数据到buffer

不推荐使用new创建Buffer实例，因为new创建的实例权限过于强大，不太安全。



## 文件操作

Node.js的文件操作方法存在两种类型：同步（sync）和异步（async）

### readFile

读取文件

回调方式写法

`fs.readFile(path[,options],callback)`

`[,options]`是可选参数，用于定义读取文件的选项，当省略options调用该方法时，文本的编码未指定，会默认返回数据Buffer：

`fs.readFile("./data.txt",(err,data) => {...})`

options可以是Object类型和String类型，可以指定读取文件的三个选项

- encoding

用于指定文件的编码格式，默认值为null，通常指定为utf-8。

- flag

用于指定文件的读取方式，在文件系统flags中取值。默认值为r。

- signal

用于指定是否允许读取文件过程中，中断读取

传入options的类型为String时，即直接指定encoding。

`fs.readFile("data.txt","utf8",(err,data)=>{...})`

文件描述符fd

### writeFIle

写入文件

回调方式写法

`fs.writeFile(file,data[,options],callback)`

`fs.writeFile('data.txt','content',(err) => {...})`

### appendFile

以追加内容的方式写入文件

### copyFile

复制文件

### watchFile

监听文件内容的变动

































