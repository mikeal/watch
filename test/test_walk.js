var fs = require("fs"),
    path = require("path"),
    assert = require("assert"),
    watch = require('../main');
    
watch.walk(path.join(__dirname, "fixtures/walk"), function(err, files) {
  assert.deepEqual(Object.keys(files), [path.join(__dirname, "fixtures/walk"), path.join(__dirname, "fixtures/walk/sub"), path.join(__dirname, "fixtures/walk/sub/test.txt")]);
});