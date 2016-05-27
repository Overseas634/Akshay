/**
 * faculty model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var faculty = require('./faculty.model');
var facultyEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
facultyEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  faculty.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    facultyEvents.emit(event + ':' + doc._id, doc);
    facultyEvents.emit(event, doc);
  }
}

module.exports = facultyEvents;
