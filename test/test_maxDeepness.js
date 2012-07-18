var fs = require("fs"),
    path = require("path"),
    assert = require("assert"),
    watch = require('../main');
    
watch.walk(path.join(__dirname, "fixtures/deepness"), { maxDeepness: 1 }, function(err, files) {
  assert.deepEqual(Object.keys(files), [path.join(__dirname, "fixtures/deepness"), path.join(__dirname, "fixtures/deepness/1")]);
});

watch.walk(path.join(__dirname, "fixtures/deepness"), { maxDeepness: 2 }, function(err, files) {
  assert.deepEqual(Object.keys(files), [path.join(__dirname, "fixtures/deepness"), path.join(__dirname, "fixtures/deepness/1"), path.join(__dirname, "fixtures/deepness/1/2")]);
});

watch.walk(path.join(__dirname, "fixtures/deepness"), function(err, files) {
  assert.deepEqual(Object.keys(files), [
    path.join(__dirname, "fixtures/deepness"),
    path.join(__dirname, "fixtures/deepness/1"),
    path.join(__dirname, "fixtures/deepness/1/2"),
    path.join(__dirname, "fixtures/deepness/1/2/3"),
    path.join(__dirname, "fixtures/deepness/1/2/3/test.txt")
  ]);
});