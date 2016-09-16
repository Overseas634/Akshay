/**
 * location model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var location = require('./location.model');
var locationEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
locationEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  location.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    locationEvents.emit(event + ':' + doc._id, doc);
    locationEvents.emit(event, doc);
  }
}

module.exports = locationEvents;
