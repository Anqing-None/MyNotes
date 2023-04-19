function trigger(bucket, activeEffect, target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return;

  const effects = depsMap.get(key)

  const effectsToRun = new Set(effects)
  // effects && effects.forEach(effectFn => {
  //   if (effectFn !== activeEffect) {
  //     effectsToRun.add(effectFn)
  //   } else {
  //     console.log(`trigger触发的副作用函数与正在运行的副作用函数不同`)
  //   }
  // })
  effectsToRun.forEach(effectFn => effectFn())
  // effects && effects.forEach(effectFn => effectFn())
}

export { trigger }