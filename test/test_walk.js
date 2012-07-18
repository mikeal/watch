var fs = require("fs"),
    path = require("path"),
    assert = require("assert"),
    watch = require('../main');
    
watch.walk(path.join(__dirname, "fixtures/w"), function(err, files) {
  assert.deepEqual(Object.keys(files), [path.join(__dirname, "fixtures/w"), path.join(__dirname, "fixtures/w/s"), path.join(__dirname, "fixtures/w/s/test.txt")]);
});