/**
 * effect函数需要嵌套执行
 * 
 * 增加正在执行的副作用函数栈，来记录副作用函数
 * 
 */
let bucket = new WeakMap();
// 正在运行的副作用函数
let activeEffect, temp1, temp2;
const effectStack = [];

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
	// 记录副作用函数
	console.log(`track: property:${key}, effectFunction:${activeEffect.fn}`);
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
	const effectsToRun = new Set();
	effects.forEach((fn) => {
		if (fn !== activeEffect) {
			effectsToRun.add(fn);
		}
	})
	effectsToRun && effectsToRun.forEach(fn => {
		console.log(`检测到数据发生改变，调用副作用函数${fn.fn}更新数据`);
		fn();
	});
}


// 用户的原始数据，需要对其进行代理，以便数据在读取时/改变时执行副作用函数
let _data = { name: "anqing", ok: true, age: 0 };

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

	function effectFn() {
		// clean副作用函数依赖
		for (let i = 0; i < effectFn.deps.length; i++) {
			// 依赖集合set
			const deps = effectFn.deps[i];
			// 删除副作用函数
			deps.delete(effectFn);
		}
		effectFn.deps.length = 0;

		activeEffect = effectFn;

		// 在调用副作用函数之前，将当前副作用函数加入栈中
		effectStack.push(effectFn);
		console.log(`即将执行的副作用函数：${activeEffect.fn},入栈，此时栈长${effectStack.length}`);

		// 执行真正的副作用函数
		console.log(`开始执行副作用函数 ${fn.name}`);
		fn();

		// 副作用函数执行完成后，将其弹出栈，恢复正在执行的副作用函数
		effectStack.pop();
		console.log(`副作用函数：${activeEffect.fn}执行完毕,出栈，此时栈长${effectStack.length}`);
		activeEffect = effectStack[effectStack.length - 1];
	}
	// 获取副作用函数依赖集合，以便在副作用函数运行前，清除上一次副作用函数的依赖
	effectFn.deps = [];
	effectFn.fn = fn.name;


	effectFn();
}


// 开始执行副作用函数
effect(function effectFn1() {
	console.log(`executing effectFn1.`);
	// 嵌套执行
	effect(function effectFn2() {
		console.log(`executing effectFn2.`);
		// 在effectFn2中读取data.ok属性
		console.log(`in effectFn2 ,reading ok property`);
		temp2 = data.ok;
	})
	// 在effectFn1中读取data.name属性
	data.age++;
	console.log(`in effectFn1 ,reading name property`);
	temp1 = data.name;
});
/*
需求
修改ok属性只会执行effectFn2函数
修改name属性执行effectFn1函数和effectFn2函数
*/


// 模拟数据发生改变时，更新数据
setTimeout(() => {
	console.log(`模拟数据变动，修改属性ok`);
	data.ok = false;
}, 1000);

// data.ok为false后，data.name的变动已经不需要响应式了，即name属性修改后，不需要执行副作用函数
setTimeout(() => {
	data.name = "xieanqing";
}, 1000);