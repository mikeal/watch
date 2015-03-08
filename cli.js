#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))
var execshell = require('exec-sh')
var watch = require('./main.js')

if(argv._.length === 0) {
  console.error('Usage: watch <command> [directory] [--wait=<seconds>] [--ignoreDotFiles] [--ignoreUnreadable]')
  process.exit()
}

var watchTreeOpts = {}
var command = argv._[0]
var dir = argv._[1] || process.cwd()
var waitTime = Number(argv.wait || argv.w)

if(argv.ignoreDotFiles || argv.d)
  watchTreeOpts.ignoreDotFiles = true

if(argv.ignoreUnreadable || argv.u)
  watchTreeOpts.ignoreUnreadableDir = true

console.error('> Watching', dir)

var wait = false

watch.watchTree(dir, watchTreeOpts, function (f, curr, prev) {
  if(wait) return

  execshell(command)

  if(waitTime > 0) {
    wait = true
    setTimeout(function () {
      wait = false
    }, waitTime * 1000)
  }
})
