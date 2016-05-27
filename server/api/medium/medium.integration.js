'use strict';

var app = require('../..');
var request = require('supertest');

var newmedium;

describe('medium API:', function() {

  describe('GET /api/mediums', function() {
    var mediums;

    beforeEach(function(done) {
      request(app)
        .get('/api/mediums')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          mediums = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      mediums.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/mediums', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/mediums')
        .send({
          name: 'New medium',
          info: 'This is the brand new medium!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newmedium = res.body;
          done();
        });
    });

    it('should respond with the newly created medium', function() {
      newmedium.name.should.equal('New medium');
      newmedium.info.should.equal('This is the brand new medium!!!');
    });

  });

  describe('GET /api/mediums/:id', function() {
    var medium;

    beforeEach(function(done) {
      request(app)
        .get('/api/mediums/' + newmedium._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          medium = res.body;
          done();
        });
    });

    afterEach(function() {
      medium = {};
    });

    it('should respond with the requested medium', function() {
      medium.name.should.equal('New medium');
      medium.info.should.equal('This is the brand new medium!!!');
    });

  });

  describe('PUT /api/mediums/:id', function() {
    var updatedmedium

    beforeEach(function(done) {
      request(app)
        .put('/api/mediums/' + newmedium._id)
        .send({
          name: 'Updated medium',
          info: 'This is the updated medium!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedmedium = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedmedium = {};
    });

    it('should respond with the updated medium', function() {
      updatedmedium.name.should.equal('Updated medium');
      updatedmedium.info.should.equal('This is the updated medium!!!');
    });

  });

  describe('DELETE /api/mediums/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/mediums/' + newmedium._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when medium does not exist', function(done) {
      request(app)
        .delete('/api/mediums/' + newmedium._id)
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
