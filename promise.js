let p;
console.log('0');
p = new Promise((resolve,reject) => {
    setTimeout(()=>{
        resolve(3)
        console.log(1);
    })
    console.log(2);
})

p.then((msg)=>{
    console.log(msg);
})