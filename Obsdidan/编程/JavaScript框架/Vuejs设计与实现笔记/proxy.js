let target = [1, 2, 3];

const proxy = new Proxy(target, {
    get(target, property) {
        if (property in target) {
            return target[property];
        }
        return 0;
    }
});


console.log(proxy[5]);