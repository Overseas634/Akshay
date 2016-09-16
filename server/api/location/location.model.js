'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var locationSchema = new Schema({
  name: String,
  country:Object,
  city:Object,
  state:Object,
  lat:Object,
  lng:Object,
  details:String,
  isActive:Boolean,
  createdAt:Date,
  image:String,
  video:String,
  howToReach:String,
  fare:String,
  currency:String
});

module.exports = mongoose.model('location', locationSchema);
