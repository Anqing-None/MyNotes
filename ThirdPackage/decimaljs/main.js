const Decimal = require('decimal.js')

let a = Decimal('0.1')
let b = Decimal('0.2')

let c = a.add(b).div(2)
console.log('c', c)