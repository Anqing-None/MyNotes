let activeEffect;

function effect(fn) {
    function effectFn() {
        activeEffect = effectFn;
        fn();
        effectFn.deps.pop();
        console.log(effectFn.deps);
    }
    effectFn.deps = [1, 2];
    effectFn();
}

effect(() => console.log(1))

console.log(activeEffect);