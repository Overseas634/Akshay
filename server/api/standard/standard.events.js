/**
 * standard model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var standard = require('./standard.model');
var standardEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
standardEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  standard.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    standardEvents.emit(event + ':' + doc._id, doc);
    standardEvents.emit(event, doc);
  }
}

module.exports = standardEvents;
