/**
 * city model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var country = require('./country.model');
var countryEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
countryEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  country.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    countryEvents.emit(event + ':' + doc._id, doc);
    countryEvents.emit(event, doc);
  }
}

module.exports = countryEvents;
