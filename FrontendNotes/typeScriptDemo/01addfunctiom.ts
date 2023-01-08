function add(a: number, b: number): number {
  return a + b;
}
const isActive: boolean = false;

const c = add(1, 3);
console.log(c);


function logValue(sample: { Value: number }) {
  console.log(sample.Value)
}

logValue({ Value: 1 });