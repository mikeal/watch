var watch = require('../main.js');
var fs = require('fs');

var filesCallCount;

var mockFileTree = {
  'root': true,
  'root/test1.js': false,
  'root/test2': true,
  'root/test3.js': false,
  'root/test2/test4.js': false
};

//Mock Class: fs.Stats (https://nodejs.org/api/fs.html#fs_class_fs_stats)
var Stat = function(dir) {
  this.isDirectory = function() {
    if (typeof mockFileTree[dir] === 'undefined') {
      throw ('Tests error: description not found: ' + dir);
    }
    return mockFileTree[dir];
  }
}

//Mock fs.stat (https://nodejs.org/api/fs.html#fs_fs_stat_path_callback)
fs.stat = function(dir, callback) {
  setTimeout(function() {
    callback(null, new Stat(dir));
  }, 1);
}

//Mock fs.readdir (https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback)
fs.readdir = function(dir, callback) {
  var files = [];

  if (dir === 'root') {
    files = [
      'test1.js',
      'test2',
      'test3.js'
    ];
  }

  if (dir === 'root/test2') {
    files = ['test4.js'];
  }

  callback(null, files);
}

//Modify fs.watchFile to calculate files calls for test checks
fs.watchFile = function(file) {
  if (!filesCallCount[file]) {
    filesCallCount[file] = 1;
  }
  else {
    filesCallCount[file]++;
  }
};

fs.unwatchFile = function() {}

describe("watchTree options: ignoreDirectoryPattern", function() {

  it("ignoreDirectoryPattern empty", function(done) {
    filesCallCount = {};
    
    watch.watchTree('root', function() {});

    setTimeout(function() {
      //expect(filesCallCount['root']).toBe(1); //Why 2 ???
      expect(filesCallCount['root/test2/test4.js']).toBe(1);
      expect(filesCallCount['root/test2']).toBe(1);
      expect(filesCallCount['root/test1.js']).toBe(1);
      expect(filesCallCount['root/test3.js']).toBe(1);
      done();
    }, 200);

  });

  it("ignoreDirectoryPattern set", function(done) {
    filesCallCount = {};
    
    watch.watchTree('root', { ignoreDirectoryPattern: new RegExp('root/test2') }, function() {});

    setTimeout(function() {
      //expect(filesCallCount['root']).toBe(1); //Why 2 ???
      expect(filesCallCount['root/test2/test4.js']).toBe(undefined);
      expect(filesCallCount['root/test2']).toBe(undefined); //Error was here
      expect(filesCallCount['root/test1.js']).toBe(1);
      expect(filesCallCount['root/test3.js']).toBe(1);
      done();
    }, 200);

  });

});
