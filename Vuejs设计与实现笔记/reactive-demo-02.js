// 一个桶，记录副作用函数，
let bucket = new Set();
// 声明一个存储变量，用于存储正在执行的副作用函数
let activeEffect;


// 用户的原始数据，需要对其进行代理，以便数据在读取时/改变时执行副作用函数
let _data = { name: "anqing" };

let data = new Proxy(_data, {
	get(target, key) {
		// 谁来读取此数据？记录下这个“谁”
		if (activeEffect) {
			bucket.add(activeEffect);
		}
		return target[key];
	},
	set(target, key, newValue) {
		target[key] = newValue;
		// 改变数据时，通知get中记录的“谁”
		bucket.forEach(fn => {
			console.log(`数据发送改变，调用副作用函数fn更新数据`);
			fn();
		});
		return true;
	}
})

// effect用于注册副作用函数,fn就是副作用函数
function effect(fn) {
	// 先保存以下fn
	activeEffect = fn;
	// 再执行fn
	fn();

}

effect(() => {
	let text = data.name;
	console.log(text);
});


// 模拟数据发生改变时，更新数据
setTimeout(() => {
	// 这里会触发setter函数，setter函数内部把getter函数中加入的effect函数执行，effect函数执行了，数据就变为最新的了。
	data.name = "xieanqing";
}, 1000);