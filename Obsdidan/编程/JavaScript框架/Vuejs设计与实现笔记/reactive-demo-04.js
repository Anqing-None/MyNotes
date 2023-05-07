// 处理遗留的副作用函数
/**
 * 处理遗留问题的思路是实时更新属性与副作用函数之间的联系（依赖关系）
 * 实现：
 * 每次执行副作用函数时，清除之前的依赖
 * 为了清除依赖，那么就要获取依赖，再删除
 * 依赖的设置位置是在track中的deps集合中，当有数据被读取时，track会记录正在运行的副作用函数与被读取的属性进行绑定
 * 所以依据这个过程，我们可以将deps集合给到正在运行的副作用函数，“给到”的实现就是增加一个属性
 * 拿到了依赖的副作用函数集合后，就可以执行清除操作了
 * 
 * 在track函数中，重新更新依赖
 */
// 一个桶，记录副作用函数
let bucket = new WeakMap();
// 声明一个存储变量，用于存储正在执行的副作用函数
let activeEffect;



function track(target, key) {
	// 如果没有正在运行的副作用函数，什么也不做，也就是无法追踪副作用函数
	if (!activeEffect) return;

	let depsMap = bucket.get(target);
	// 如果depsMap不存在，就创建
	if (!depsMap) {
		depsMap = new Map();
		bucket.set(target, depsMap);
	}
	// deps是依赖副作用函数的集合，depsMap的键是响应式对象的属性，每个响应式数据中的属性都有对应的副作用函数集合set记录着副作用函数
	let deps = depsMap.get(key);
	// 与上述逻辑相同
	if (!deps) {
		deps = new Set();
		depsMap.set(key, deps);
	}
	console.log(`track: property:${key}, effectFunction:`)
	// 记录副作用函数
	deps.add(activeEffect);
	// 将记录的副作用函数给到effect控制函数中，这样就可以在每次执行副作用函数时，清空依赖集合
	activeEffect.deps.push(deps);
}

function trigger(target, key) {
	// 改变数据时，从桶中取出已记录的副作用函数函数
	const depsMap = bucket.get(target);
	// 不存在，什么也不做
	if (!depsMap) return;
	// 获取已记录的effecthanshu 
	const effects = depsMap.get(key);

	const effectsToRun = new Set(effects);
	effectsToRun && effectsToRun.forEach(fn => {
		console.log(`数据发生改变，调用副作用函数fn更新数据`);
		fn();
	});
}


// 用户的原始数据，需要对其进行代理，以便数据在读取时/改变时执行副作用函数
let _data = { name: "anqing", ok: true };

let data = new Proxy(_data, {
	get(target, key) {
		track(target, key);
		return target[key];
	},
	set(target, key, newValue) {
		target[key] = newValue;
		trigger(target, key);
		return true;
	}
})


// effect用于注册副作用函数,fn就是副作用函数
function effect(fn) {
	// 使用函数包装一下副作用函数，activeEffect设置为此函数，在track中就可以为此函数添加（接收）副作用函数集合
	function effectFn() {
		activeEffect = effectFn;
		// clean副作用函数依赖
		for (let i = 0; i < effectFn.deps.length; i++) {
			// 依赖集合set
			const deps = effectFn.deps[i];
			// 删除副作用函数
			deps.delete(effectFn);
		}
		// 删除完后重置deps数组
		effectFn.deps.length = 0;
		// 执行副作用函数
		console.log(`execute effectFunction ${fn.name}`);
		fn();
	}
	// 添加依赖副作用函数集合
	effectFn.deps = [];
	// 执行
	effectFn();
}


effect(() => {
	let text = data.ok ? data.name : "not";
	console.log(text);
});


// 模拟数据发生改变时，更新数据
setTimeout(() => {
	data.ok = false;
}, 1000);

// data.ok为false后，data.name的变动已经不需要响应式了，即name属性修改后，不需要执行副作用函数
setTimeout(() => {
	data.name = "xieanqing";
	console.log("修改data.name属性");
}, 1000);