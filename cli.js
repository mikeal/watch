#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))
var execshell = require('exec-sh')
var path = require('path')
var watch = require('./main.js')

if(argv._.length === 0) {
  console.error('Usage: watch <command> [...directory] [--wait=<seconds>] [--filter=<file>] [--ignoreDotFiles] [--ignoreUnreadable] [--verbose]')
  process.exit()
}

var watchTreeOpts = {}
var command = argv._[0]
var dirs = []

var i
var argLen = argv._.length
if (argLen > 1) {
  for(i = 1; i< argLen; i++) {
      dirs.push(argv._[i])
  }
} else {
  dirs.push(process.cwd())
}

var waitTime = Number(argv.wait || argv.w)

if(argv.ignoreDotFiles || argv.d)
  watchTreeOpts.ignoreDotFiles = true

if(argv.ignoreUnreadable || argv.u)
  watchTreeOpts.ignoreUnreadableDir = true

if(argv.filter || argv.f) {
  try {
    watchTreeOpts.filter = require(path.resolve(process.cwd(), argv.filter || argv.f))
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

var wait = false

var dirLen = dirs.length
var skip = dirLen - 1
for(i = 0; i < dirLen; i++) {
  var dir = dirs[i]
  console.error('> watch: Watching', dir)
  watch.watchTree(dir, watchTreeOpts, function (f, curr, prev) {
    if(skip) {
        skip--
        return
    }
    if(wait) return

    if (argv.verbose || argv.v) {
      if (typeof f == "object" && prev === null && curr === null) {
        console.log("> watch: Watching " + Object.keys(f).length + " files.");
      } else if (prev === null) {
        console.log("> watch: New file: " + f + ". Executing.");
      } else if (curr.nlink === 0) {
        // f was removed
        console.log("> watch: File removed: " + f + ". Executing.");
      } else {
        console.log("> watch: File changed: " + f + ". Executing");
      }
    }
    execshell(command)

    if(waitTime > 0) {
      wait = true
      setTimeout(function () {
        wait = false
      }, waitTime * 1000)
    }
  })
}
