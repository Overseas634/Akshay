'use strict';

var app = require('../..');
var request = require('supertest');

var newdepartment;

describe('department API:', function() {

  describe('GET /api/departments', function() {
    var departments;

    beforeEach(function(done) {
      request(app)
        .get('/api/departments')
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

  describe('POST /api/departments', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/departments')
        .send({
          name: 'New department',
          info: 'This is the brand new department!!!'
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

    it('should respond with the newly created department', function() {
      newdepartment.name.should.equal('New department');
      newdepartment.info.should.equal('This is the brand new department!!!');
    });

  });

  describe('GET /api/departments/:id', function() {
    var department;

    beforeEach(function(done) {
      request(app)
        .get('/api/departments/' + newdepartment._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          department = res.body;
          done();
        });
    });

    afterEach(function() {
      department = {};
    });

    it('should respond with the requested department', function() {
      department.name.should.equal('New department');
      department.info.should.equal('This is the brand new department!!!');
    });

  });

  describe('PUT /api/departments/:id', function() {
    var updateddepartment

    beforeEach(function(done) {
      request(app)
        .put('/api/departments/' + newdepartment._id)
        .send({
          name: 'Updated department',
          info: 'This is the updated department!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updateddepartment = res.body;
          done();
        });
    });

    afterEach(function() {
      updateddepartment = {};
    });

    it('should respond with the updated department', function() {
      updateddepartment.name.should.equal('Updated department');
      updateddepartment.info.should.equal('This is the updated department!!!');
    });

  });

  describe('DELETE /api/departments/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/departments/' + newdepartment._id)
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
        .delete('/api/departments/' + newdepartment._id)
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
