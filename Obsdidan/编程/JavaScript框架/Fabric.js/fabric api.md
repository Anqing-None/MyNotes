
```js
const canvas = new fabric.Canvas('id');

const circle = new fabric.Circle({});

// add element
canvas.add(circle)

// remove element
canvas.remove(circle)

// update circle
circle.set(property, value)

// get value
circle.get(property)
```

## fabric.Circle

绘制圆形
```js
const circle = new fabric.Circle({
	radius:20,
	fill: 'green',
	left:100,
	top: 100
})
```

## fabric.Ellipse


## fabric.Line

## fabric.Polygon

## fabric.Polyline

## fabric.Rect

## fabric.Triangle
绘制三角形
```js
const triangle = new fabric.Triangle({
width: 20,
height: 30,
fill: 'bule',
left: 50,
top: 50
})
```



绘制单元格

移除默认的拖动事件

点击后高亮单元格
将边框颜色改变 加粗

border选中后才会出现


```js
rect.set({borderColor: '#436ff6', strokeWidth: 2 })
```

```js

const rectDict = {
	left: 10, // 左边距离，px
	top: 10, // 顶部距离，px
	
	fill: 'transparent', // 填充颜色
	backgroundColor: '#fff', // 背景颜色
	
	borderColor: 'red', // 边框颜色
	hasBorders:Boolean, // default true
	
	stroke: 'red', // 线条颜色
	strokeWidth: 2,
	
	hoverCursor: 'pointer', // 指针样品 'default' | 'pointer' | 'text' | 'cell'
	
	width: 200, // 宽度 px
	
	height: 200, // 高度 px

	hasControls: Boolean, // default true, 是否固定矩形大小及其位置

	lockMovementX : Boolean, // default false，是否可以水平移动
	lockMovementY : Boolean,
}
```
backgroundColor


## 事件

``` js
var canvas = new fabric.Canvas('...');
canvas.on('mouse:down', function(options) {
  console.log(options.e.clientX, options.e.clientY);
});
```
