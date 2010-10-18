var watch = require('../main')
  , assert = require('assert')
  ;

watch.createMonitor(__dirname, function (monitor) {
  monitor.on('created', function (f) {
    console.log('created '+f)
  })
  monitor.on('removed', function (f) {
    console.log('removed '+f)
  })
  monitor.on('changed', function (f) {
    console.log('changed '+f)
  })
});