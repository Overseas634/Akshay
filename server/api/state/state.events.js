/**
 * state model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var state = require('./state.model');
var stateEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
stateEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  state.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    stateEvents.emit(event + ':' + doc._id, doc);
    stateEvents.emit(event, doc);
  }
}

module.exports = stateEvents;
