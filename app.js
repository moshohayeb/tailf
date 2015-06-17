var tailf       = require('./')
var path        = require('path')
var Hearthstone = require('./hearthstone')

//LOG = path.join(process.env.HOME, 'Library', 'Logs', 'Unity', 'Player.log');
LOG = './log.txt'
hs  = new Hearthstone

tailf(LOG, { whole: true }, function (line) {
  hs.emit('line', line)
})
