const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('./demo.pdf');

pdf(dataBuffer).then(function (data) {
  // use data
  console.log(data)
})
  .catch(function (error) {
    // handle exceptions
    console.log(error)

  })