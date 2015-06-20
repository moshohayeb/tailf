var fs    = require('fs')
var _     = require('lodash')
var split = require('split')

var BUFLEN = 8192

var tailf = function (file, opts, online, onerror) {
  var ws     = split()
  var buffer = new Buffer(BUFLEN)
  var fd     = fs.openSync(file, 'r+')
  var offset = fs.statSync(file).size
  var watched

  opts = opts || {}

  ws.on('data', online)
  if (_.isFunction(onerror)) {
    ws.on('error', onerror)
  }

  function watchman() {
    watched = fs.watch(file)
    watched.on('change', function (event, fname) {
      if (event !== 'change') return
      var data
      var nbyte

      nbyte = fs.readSync(fd, buffer, 0, BUFLEN, offset)
      offset += nbyte;

      data = buffer.toString('utf8', 0, nbyte)
      ws.write(data)
    })
  }

  if (opts.fromStart) {
    var rs = fs.createReadStream(file)
    rs.pipe(ws, { end: false })
    rs.on('end', watchman)
    rs.on('error', function (error) { console.error('received error:', error) })

  } else {
    watchman()
  }
}

module.exports = tailf