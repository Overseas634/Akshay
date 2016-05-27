/**
 * student model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var student = require('./student.model');
var studentEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
studentEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  student.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    studentEvents.emit(event + ':' + doc._id, doc);
    studentEvents.emit(event, doc);
  }
}

module.exports = studentEvents;
