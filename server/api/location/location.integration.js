'use strict';

var app = require('../..');
var request = require('supertest');

var newdepartment;

describe('location API:', function() {

  describe('GET /api/locations', function() {
    var departments;

    beforeEach(function(done) {
      request(app)
        .get('/api/locations')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          departments = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      departments.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/locations', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/locations')
        .send({
          name: 'New location',
          info: 'This is the brand new location!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newdepartment = res.body;
          done();
        });
    });

    it('should respond with the newly created location', function() {
      newdepartment.name.should.equal('New location');
      newdepartment.info.should.equal('This is the brand new location!!!');
    });

  });

  describe('GET /api/locations/:id', function() {
    var location;

    beforeEach(function(done) {
      request(app)
        .get('/api/locations/' + newlocation._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          location = res.body;
          done();
        });
    });

    afterEach(function() {
      location = {};
    });

    it('should respond with the requested location', function() {
      location.name.should.equal('New location');
      location.info.should.equal('This is the brand new department!!!');
    });

  });

  describe('PUT /api/locations/:id', function() {
    var updatedlocation

    beforeEach(function(done) {
      request(app)
        .put('/api/locations/' + newlocation._id)
        .send({
          name: 'Updated location',
          info: 'This is the updated location!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedlocation = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedlocation = {};
    });

    it('should respond with the updated location', function() {
      updatedlocation.name.should.equal('Updated location');
      updatedlocation.info.should.equal('This is the updated location!!!');
    });

  });

  describe('DELETE /api/locations/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/locations/' + newlocation._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when department does not exist', function(done) {
      request(app)
        .delete('/api/locations/' + newlocation._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
