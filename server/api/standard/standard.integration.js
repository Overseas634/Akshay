'use strict';

var app = require('../..');
var request = require('supertest');

var newstandard;

describe('standard API:', function() {

  describe('GET /api/standards', function() {
    var standards;

    beforeEach(function(done) {
      request(app)
        .get('/api/standards')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          standards = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      standards.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/standards', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/standards')
        .send({
          name: 'New standard',
          info: 'This is the brand new standard!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newstandard = res.body;
          done();
        });
    });

    it('should respond with the newly created standard', function() {
      newstandard.name.should.equal('New standard');
      newstandard.info.should.equal('This is the brand new standard!!!');
    });

  });

  describe('GET /api/standards/:id', function() {
    var standard;

    beforeEach(function(done) {
      request(app)
        .get('/api/standards/' + newstandard._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          standard = res.body;
          done();
        });
    });

    afterEach(function() {
      standard = {};
    });

    it('should respond with the requested standard', function() {
      standard.name.should.equal('New standard');
      standard.info.should.equal('This is the brand new standard!!!');
    });

  });

  describe('PUT /api/standards/:id', function() {
    var updatedstandard

    beforeEach(function(done) {
      request(app)
        .put('/api/standards/' + newstandard._id)
        .send({
          name: 'Updated standard',
          info: 'This is the updated standard!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedstandard = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedstandard = {};
    });

    it('should respond with the updated standard', function() {
      updatedstandard.name.should.equal('Updated standard');
      updatedstandard.info.should.equal('This is the updated standard!!!');
    });

  });

  describe('DELETE /api/standards/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/standards/' + newstandard._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when standard does not exist', function(done) {
      request(app)
        .delete('/api/standards/' + newstandard._id)
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
