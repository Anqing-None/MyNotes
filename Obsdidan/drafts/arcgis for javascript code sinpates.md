
缩放地图视图到要素并打开popup
```js
view
.goTo(result.geometry.extent.expand(2))
.then(function () {
	view.openPopup({
		features: [result],
		location: result.geometry.centroid
	});
})

```

bbox: \[110, 32, 120, 40]
\[ 最小经度, 最小纬度, 最大经度, 最大纬度 ]


```js

```