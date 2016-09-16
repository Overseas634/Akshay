'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var citySchema = new Schema({
  name: String,
  country:Object,
  state:Object,
  lat:String,
  lng:String,
  description:String,
  isActive:Boolean,
  createdAt:Date
});

module.exports = mongoose.model('city', citySchema);
