var tailf = require('./')

tailf('./Player.txt', function (line) {
  console.log('XX: ', line)
}, function (err) {
  console.log('ERROR: ', err)
})