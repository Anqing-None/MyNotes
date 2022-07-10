function slow(x) {
    return x;
}

function save(x) {
    let map = new Map();
    if (map.has(x)) {
        return map.get(x);
    }

    let ret = slow(x)
    map.set(x, ret);
    return ret;
}

function decorator(fn) {
    let map = new Map();
    const inner = (x) => {
        if (map.has(x)) {
            return map.get(x)
        }
        let ret = fn(x);
        map.set(x, ret);
    };
    return inner;
}

console.log(save(4));
