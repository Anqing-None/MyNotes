// 一个桶，记录副作用函数，
let bucket = new Set();
// 用户的原始数据，需要对其进行代理，以便数据在读取时/改变时执行副作用函数
let _data = { name: "anqing" };

let data = new Proxy(_data, {
	get(target, key) {
		// 谁来读取此数据？记录下这个“谁”
		bucket.add(effect);
		return target[key];
	},
	set(target, key, newValue) {
		target[key] = newValue;
		// 改变数据时，通知get中记录的“谁”
		bucket.forEach(fn => fn());
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