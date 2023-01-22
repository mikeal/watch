var cp = require("child_process")

function getShell() {
  if (process.platform === "win32") {
    return { cmd: "cmd", arg: "/C" }
  } else {
    return { cmd: "sh", arg: "-c" }
  }
}

function exec(command) {
  var shell = getShell()
  var child = cp.spawn(shell.cmd, [shell.arg, command], { stdio: "inherit" })
  return child
}

exports.exec = exec
