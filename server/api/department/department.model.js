'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var departmentSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('department', departmentSchema);