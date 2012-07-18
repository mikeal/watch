var watch = require('../main')
  , assert = require('assert')
  , path = require('path')
  , fs = require('fs')
  , dir = path.join(__dirname, "fixtures/d")
  , target = path.join(dir, "t")
  ;

function clearFile() {
  fs.writeFileSync(target, '')
}

clearFile()

// test if changed event is fired correctly
watch.createMonitor(dir, { interval: 150 },
  function (monitor) {
    monitor.once('changed', function (f) {
      assert.equal(f, target);
      clearFile();
      process.exit(0);
    })
    
    setTimeout(function() {
      fs.writeFile(target, 'Test Write\n', function (err) {
        if (err) throw err;

        setTimeout(function () {
          // should have got the other assert done by now
          assert.ok(false);
        }, 300);
      })
    }, 1000);
});
