var fs    = require('fs')
var _     = require('lodash')
var split = require('split')

var BUFLEN = 8192

var tailf = function (file, online, onerror) {
  var ws     = split()
  var buffer = new Buffer(BUFLEN)
  var fd     = fs.openSync(file, 'r+')
  var offset = fs.statSync(file).size
  var watched

  ws.on('data', online)
  if (_.isFunction(onerror)) {
    ws.on('error', onerror)
  }

  watched = fs.watch(file)
  watched.on('change', function (event, fname) {
    if (event !== 'change') return
    var data
    var nbyte

    nbyte = fs.readSync(fd, buffer, 0, BUFLEN, offset)
    offset += nbyte;

    console.log(buffer.length)
    data = buffer.toString('utf8', 0, nbyte)
    ws.write(data)
  })
}

module.exports = tailf