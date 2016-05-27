/**
 * subject model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var subject = require('./subject.model');
var subjectEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
subjectEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  subject.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    subjectEvents.emit(event + ':' + doc._id, doc);
    subjectEvents.emit(event, doc);
  }
}

module.exports = subjectEvents;
