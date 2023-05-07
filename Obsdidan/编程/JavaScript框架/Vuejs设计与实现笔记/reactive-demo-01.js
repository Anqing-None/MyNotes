// 一个桶，记录副作用函数，
let bucket = new Set();
// 用户的原始数据，需要对其进行代理，以便数据在读取时/改变时执行副作用函数
let _data = { name: "anqing" };

let data = new Proxy(_data, {
	// get会在data的属性被读取时调用
	get(target, key) {
		// 谁来读取此数据？记录下这个“谁”
		// 即当属性被读取时，将副作用函数添加进桶内，记录下来，以便在set中调用
		bucket.add(effect);
		return target[key]; // 不对读取的值做处理
	},
	// set会在data的属性被赋值时调用
	set(target, key, newValue) {
		target[key] = newValue; // 进行正常赋值操作
		// 开始做响应有关的事情
		// 改变数据时，通知get中记录的“谁”
		bucket.forEach(fn => fn()); // 这里把之前记录的函数，统统执行，副作用函数会得到更新后的值
		return true;
	}
})

// 定义一个副作用函数,此时的函数名称必须要与bucket.add(effect);中加入的函数名称一致
function effect() {
	// data.name会触发getter函数，所以这个effect函数就被添加到了bucket中
	let text = data.name;
	console.log(text);
}

effect();


// 模拟数据发生改变时，更新数据
setTimeout(() => {
	// 这里会触发setter函数，setter函数内部把getter函数中加入的effect函数执行，effect函数执行了，数据就变为最新的了。
	data.name = "xieanqing";
}, 1000);