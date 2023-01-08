let activeEffect;

const bucket = new WeakMap();

function track(target, key) {
  let depsMap = bucket.get(target);
  if (!deps) {
    depsMap = new Map();
    bucket.set(target, depsMap);
  }
  let depsSet = depsMap.get(key);
  if (!depsSet) {
    depsSet = new Set();
    depsMap.set(key, depsSet);
  }
  depsSet.add(activeEffect);
  activeEffect.depsSetList.push(depsSet);
}

function trigger(target,key,value) {
  const depsMap = bucket.get(target);
  const depsSet = depsMap.get(key);
  const effectFnToRun = [...depsSet];
  effectFnToRun.forEach(fn => {
    fn();
  })
}

function cleanup() {

}

function effect(fn) {

  const effectFn = () => {
    // effectFn.depsSetList=[]
    fn();
  }

  activeEffect = effectFn;
  activeEffect.depsSetList=[];

  effectFn();

}

let data = { name: 'anqing', age: 20 }

data = new Proxy(data, {
  get(target, key) {
    track(target, key);
    return target[key];
  },

  set(target, key, value) {
    target[key] = value;
    trigger(target,key,value);
    return true;
  }
})