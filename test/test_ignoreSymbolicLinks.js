var watch = require('../main')
  , assert = require('assert')
  , path = require('path')
  , fs = require('fs')
  , dir = path.join(__dirname, "fixtures/s")
  , target = path.join(dir, "d/t")
  ;

function clearFile() {
  fs.writeFileSync(target, '')
}

clearFile()

// test if changed event is fired correctly
watch.createMonitor(dir, { interval: 150, ignoreSymbolicLinks: true },
  function (monitor) {
    monitor.once('changed', function (f) {
      // this shouldn't have been fired
      assert.ok(false);
    })
    
    setTimeout(function() {
      fs.writeFile(target, 'Test Write\n', function (err) {
        if (err) throw err;

        setTimeout(function () {
          assert.ok(true);
          clearFile();
          process.exit(0)
        }, 300);
      })
    }, 1000);
});
