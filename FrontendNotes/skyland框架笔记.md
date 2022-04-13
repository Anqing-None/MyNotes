# 组件

## fx-widget





## fx-grid-widget

传入参数对象Opts

```javascript
Opts = {
    //将请求到的数据（api/本地读取）放到dataList中，组件会对其进行监听，依据dataList的值进行一些操作
	dataList:[],
    //数据的分组规则
    groupRule: {
        field: 'department'
    },
    //排序规则
    orderRule: {},
    //过滤函数列表
    filterRuleFnArr: []
    
}
```

### dataList与table

dataList类型为数组，用于放置api请求的数据，格式类似`[ {},{},{}... ]`，一个列表内存储了若干条数据对象；

fx-grid-widget组件会自动读取传入的dataList，依据dataLize中的数据生成一个table数组，table数组存放在<span style="color:red;">fx-grid-widget组件自身上：`gridThis.table`</span>；

通过监听dataList的变动，实时地将dataList中的数据包装成一个具有统一数据结构的table列表，table的数据格式如`[ {row:[{},{},{}...]} ]`



fx-grid-widget接收一个自身的gridThis数据，在vue中利用计算属性去计算table展示到页面？？

为什么不this.table????还要this.gridThis.table？？？

fx-grid-widget组件通过ref拿到，被存储在了vuex中；但在fx-grid-widget内部却要获取gridThis；说明fx-grid-widget内部还有一个vue component实例；

这个实例是fx-widget组件。

<img src="https://raw.githubusercontent.com/Anqing-None/PicStore/master/img/gridThis.drawio.svg" alt="gridThis.drawio" style="zoom:75%;" />



传入loaded回调执行函数init

```javascript
init() {
	// 在此函数中将fx-grid-widget组件对象挂载到vuex中
    
    //异步获取一些数据，存放在fx-grid-widget组件对象Opts.dataList中
    
}
```

init方法接收了一个参数，该参数为一个组件对象