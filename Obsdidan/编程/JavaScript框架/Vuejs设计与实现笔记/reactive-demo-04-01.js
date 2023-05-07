const bucket = new WeakMap(); // {}-> Map(key,Set())


let activeEffectFn; // actived effect function, it may change with the runnning state. it always represent the effect function that running now.

const effectStack = [];

/**
* @summary register and reactive(when data property change, running effect function again.)
* @param {function} fn - effect function
* @return {undefined} 
*/
function effect(fn) {

    // fnWrapper is fn wrapper, need add some proeerties on it. 
    // add the dependency on it, when property been read, clean the dependency, then build new dependency.
    const fnWrapper = () => {
        activeEffectFn = fnWrapper;
        cleanup(activeEffectFn);  // clean when every effectFn running times
        fn();
    }
    
    fnWrapper.dependencySetList = []; // the Array store many dependencySet
    fnWrapper();

}


const data = { name: 'anqing', useName: true }

const _data = new Proxy(data, {
    get(target, key) {
        // track dependency here.
        track(target, key);

        return target[key];
    },
    set(target, key, newValue) {
        target[key] = newValue;
        // when the key is changed, trigger the effect function.
        trigger(target, key);
        return true;
    }


})

effect(() => {
    // get the data property value
    let name = _data.useName ? _data.name : "notUseName";
    console.log(name);
})

_data.name = "change";
_data.useName = false;

// when useName become false, the name should not be read, the Fn should not be running

_data.name = "change2"


function track(target, key) {
    if (!activeEffectFn) {
        return;
    }

    let dependencyMap = bucket.get(target);
    // 没有就创建
    if (!dependencyMap) {
        dependencyMap = new Map();
        bucket.set(target, dependencyMap);
    }

    let dependencySet = dependencyMap.get(key);
    // 没有就创建
    if (!dependencySet) {
        dependencySet = new Set();
        dependencyMap.set(key, dependencySet);
    }
    // 记录副作用函数
    dependencySet.add(activeEffectFn);
    // the next time before track will clean the dependencySet then build fresh dependencySet. 
    activeEffectFn.dependencySetList.push(dependencySet);
}


function trigger(target, key) {
    // 从桶中取出副作用函数
    const dependencyMap = bucket.get(target);
    if (!dependencyMap) {
        return;
    }
    const dependencySet = dependencyMap.get(key);
    if (!dependencySet) { return; }

    const effectFnList = Array.from(dependencySet);

    effectFnList.forEach(fn => {
        fn();
    })
}

function cleanup(activeEffectFn) {
    for (let i = 0; i < activeEffectFn.dependencySetList.length; i++) {
        const dependencySet = activeEffectFn.dependencySetList[i];
        dependencySet.delete(fnWrapper); // clean the dependency Fn
    }
}