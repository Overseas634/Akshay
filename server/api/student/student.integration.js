'use strict';

var app = require('../..');
var request = require('supertest');

var newstudent;

describe('student API:', function() {

  describe('GET /api/students', function() {
    var students;

    beforeEach(function(done) {
      request(app)
        .get('/api/students')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          students = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      students.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/students', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/students')
        .send({
          name: 'New student',
          info: 'This is the brand new student!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newstudent = res.body;
          done();
        });
    });

    it('should respond with the newly created student', function() {
      newstudent.name.should.equal('New student');
      newstudent.info.should.equal('This is the brand new student!!!');
    });

  });

  describe('GET /api/students/:id', function() {
    var student;

    beforeEach(function(done) {
      request(app)
        .get('/api/students/' + newstudent._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          student = res.body;
          done();
        });
    });

    afterEach(function() {
      student = {};
    });

    it('should respond with the requested student', function() {
      student.name.should.equal('New student');
      student.info.should.equal('This is the brand new student!!!');
    });

  });

  describe('PUT /api/students/:id', function() {
    var updatedstudent

    beforeEach(function(done) {
      request(app)
        .put('/api/students/' + newstudent._id)
        .send({
          name: 'Updated student',
          info: 'This is the updated student!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedstudent = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedstudent = {};
    });

    it('should respond with the updated student', function() {
      updatedstudent.name.should.equal('Updated student');
      updatedstudent.info.should.equal('This is the updated student!!!');
    });

  });

  describe('DELETE /api/students/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/students/' + newstudent._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when student does not exist', function(done) {
      request(app)
        .delete('/api/students/' + newstudent._id)
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
