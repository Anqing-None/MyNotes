class Animal {
  constructor(name) {
    this.name = name;
  }
  weight = 0;

  eat(food) {
    this.weight += food;
    console.log(`wangcai's weight is ${this.weight}.`);
  }
}

const wangcai = new Animal('wangcai');

wangcai.eat(5);
