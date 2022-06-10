/**
 * 当访问一个不存在的属性时，副作用函数仍然会执行
 * 重新设计存储副作用函数桶的数据结构，让属性与副作用函数一对多
 */

// 一个桶，记录副作用函数
let bucket = new WeakMap();
// 声明一个存储变量，用于存储正在执行的副作用函数
let activeEffect;

// effect用于注册副作用函数,fn就是副作用函数
function effect(fn) {
	// 先保存以下fn
	activeEffect = fn;
	// 再执行fn
	fn();

}

function track(target, key) {
	// 如果没有正在运行的副作用函数，什么也不做，也就是无法追踪副作用函数
	if (!activeEffect) return;
	// deps是dependents的缩写，意味依赖，depsMap为依赖Map
	let depsMap = bucket.get(target);
	// 如果depsMap不存在，就创建
	if (!depsMap) {
		depsMap = new Map();
		bucket.set(target, depsMap);
	}
	// deps是依赖副作用函数的集合，depsMap的键是响应式对象的属性，每个响应式数据中的属性都有对应的副作用函数集合set记录着副作用函数
	let deps = depsMap.get(key);
	// 与上述逻辑相同,没有就创建后设置
	if (!deps) {
		deps = new Set();
		depsMap.set(key, deps);
	}
	// 记录副作用函数到set()集合中
	deps.add(activeEffect);
}

function trigger(target, key) {
	// 改变数据时，从桶中取出已记录的副作用函数函数
	const depsMap = bucket.get(target);
	// 不存在，什么也不做
	if (!depsMap) return;
	// 获取已记录的effecthanshu 
	const effects = depsMap.get(key);

	effects && effects.forEach(fn => {
		console.log(`数据发生改变，调用副作用函数fn更新数据`);
		fn();
	});
}


// 用户的原始数据，需要对其进行代理，以便数据在读取时/改变时执行副作用函数
let _data = { name: "anqing" };

let data = new Proxy(_data, {
	get(target, key) {
		track(target, key);
		// if (!activeEffect) return; // 如果没有正在运行的副作用函数，什么也不做
		// // 这里应该直接return getter的返回值

		// let depsMap = bucket.get(target); // 尝试获取数据对象的weakmap
		// // 如果depsMap不存在，就创建
		// if (!depsMap) {
		// 	depsMap = new Map();
		// 	bucket.set(target, depsMap);
		// }

		// let deps = depsMap.get(key);
		// // 与上述逻辑相同
		// if (!deps) {
		// 	deps = new Set();
		// 	depsMap.set(key, deps);
		// }
		// // 记录谁来读取
		// deps.add(activeEffect);

		return target[key];
	},
	set(target, key, newValue) {
		target[key] = newValue;

		trigger(target, key);

		// // 改变数据时，从桶中取出已记录的副作用函数函数
		// const depsMap = bucket.get(target);
		// // 不存在，什么也不做
		// if (!depsMap) return;
		// // 获取已记录的effecthanshu 
		// const effects = depsMap.get(key);

		// effects && effects.forEach(fn => {
		// 	console.log(`数据发生改变，调用副作用函数fn更新数据`);
		// 	fn();
		// });
		return true;
	}
})



effect(() => {
	let text = data.name;
	console.log(text);
});


// 模拟数据发生改变时，更新数据
setTimeout(() => {
	// 这里会触发setter函数，setter函数内部把getter函数中加入的effect函数执行，effect函数执行了，数据就变为最新的了。
	data.name = "xieanqing";
}, 1000);