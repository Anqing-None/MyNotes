const fs = require('fs')
const Stream = require('stream')

const readableStream = fs.createReadStream('webpackNotes.md')

const writableStream = fs.createWriteStream('test.md')

readableStream.pipe(writableStream);

