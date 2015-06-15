var fs = require('fs')

var i = 0
var data
setInterval(function () {
  data = 'Line ' + i.toString() + '\n'
  fs.writeFileSync('./Player.txt', data, { flag: 'a+' })
  i += 1
}, 50)
