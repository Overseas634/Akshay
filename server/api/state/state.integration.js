'use strict';

var app = require('../..');
var request = require('supertest');

var newdepartment;

describe('state API:', function() {

  describe('GET /api/states', function() {
    var departments;

    beforeEach(function(done) {
      request(app)
        .get('/api/states')
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

  describe('POST /api/states', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/states')
        .send({
          name: 'New state',
          info: 'This is the brand new state!!!'
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

    it('should respond with the newly created state', function() {
      newdepartment.name.should.equal('New state');
      newdepartment.info.should.equal('This is the brand new state!!!');
    });

  });

  describe('GET /api/states/:id', function() {
    var state;

    beforeEach(function(done) {
      request(app)
        .get('/api/states/' + newstate._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          state = res.body;
          done();
        });
    });

    afterEach(function() {
      state = {};
    });

    it('should respond with the requested state', function() {
      state.name.should.equal('New state');
      state.info.should.equal('This is the brand new department!!!');
    });

  });

  describe('PUT /api/departments/:id', function() {
    var updatedstate

    beforeEach(function(done) {
      request(app)
        .put('/api/states/' + newstate._id)
        .send({
          name: 'Updated state',
          info: 'This is the updated state!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedstate = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedstate = {};
    });

    it('should respond with the updated state', function() {
      updatedstate.name.should.equal('Updated state');
      updatedstate.info.should.equal('This is the updated state!!!');
    });

  });

  describe('DELETE /api/states/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/states/' + newstate._id)
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
        .delete('/api/states/' + newstate._id)
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
