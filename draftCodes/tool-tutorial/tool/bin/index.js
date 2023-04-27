#!/usr/bin/env node

const arg = require('arg');
try {
  const args = arg({
    '--start': Boolean,
    '--build': Boolean,
    "-i": String
  });
  if (args['--start']) console.log('start');
  if (args['--build']) console.log('build');
  if (args['-i']) console.log(args['-i']);

  console.log(args)

} catch (error) {
  console.log(error.message)
  usage();
}

function usage() {
  console.log(`tool [CMD]
  --start\tStarts the app
  --build\tBuilds the app`)
}