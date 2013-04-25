var fs, watch;
watch = require('../main');
fs = require('fs');

watch.createMonitor(__dirname, function (monitor) {
    monitor.on("created", function (f, stat) {
        return console.log(f + " created");
    });
    monitor.on("changed", function (f, curr, prev) {
        return console.log(f + " changed");
    });
    return monitor.on("removed", function (f, stat) {
        return console.log(f + " removed");
    });
});
