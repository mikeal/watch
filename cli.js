#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))
var exec = require('child_process').exec
var watch = require('./main.js')

if(argv._.length === 0) {
  console.error('Usage: watch <command> [directory] [--wait=<seconds>]')
  process.exit()
}

var command = argv._[0]
var dir = argv._[1] || process.cwd()
var waitTime = Number(argv.wait || argv.w)

console.error('> Watching', dir)

var wait = false

watch.watchTree(dir, function (f, curr, prev) {
  if(wait) return
  
  var run = exec(command)
  run.stdout.pipe(process.stdout)
  run.stderr.pipe(process.stderr)
  
  if(waitTime > 0) {
    wait = true
    setTimeout(function () {
      wait = false
    }, waitTime * 1000)
  }
})
