import { track } from './track.js';
import { trigger } from './trigger.js';
let activeEffect;
const bucket = new WeakMap();
const data = new Proxy({ name: 'anqing', age: 25, ok: true }, {
  get(target, key) {
    track(bucket, activeEffect, target, key);
    return target[key]
  },
  set(target, key, value) {
    target[key] = value;
    trigger(bucket, activeEffect, target, key);
    return true;
  }
})

function effect(fn) {

  const fnToRun = () => {
    for (let i = 0; i < fnToRun.deps.length; i++) {
      const depsSet = fnToRun.deps[i];
      depsSet.delete(fnToRun);
    }
    fn();
  }

  activeEffect = fnToRun;
  activeEffect.deps = [];

  fnToRun()
}

let executeTimes = 0;

effect(() => {
  const logText = data.ok ? `name: ${data.name},executeTimes:${executeTimes}` : `age: ${data.age}.executeTimes:${executeTimes}`;

  console.log(logText)
  executeTimes++;
})



setTimeout(() => {
  data.ok = false
}, 1000)