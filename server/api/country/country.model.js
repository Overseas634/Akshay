'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var countrySchema = new Schema({
  name: String,
  info: String,
  isActive: Boolean,
  createdAt: Date,
  countryCode:String,
  description:String,
  currency:String,
  lat:String,
  lng:String,
});

module.exports = mongoose.model('country', countrySchema);
