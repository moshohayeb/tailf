var inherits = require('util').inherits
var EventEmitter = require('events').EventEmitter

var _ = require('lodash')


function onLine(line) {
  if (_.trim(line) === '') return;
  console.log(line)
}

var Hearthstone = function () {
  EventEmitter.call(this);

  this.playerId = -1;
  this.opponentId = -1;
  this.on('line', onLine)
}
inherits(Hearthstone, EventEmitter)


module.exports = Hearthstone

