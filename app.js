var tailf = require('./')
var path = require('path')

var path = path.join(process.env.HOME, 'Library', 'Logs', 'Unity', 'Player.log');

tailf(path, function (line) {
  //console.log('XX: ', line)
}, function (err) {
  console.log('ERROR: ', err)
})