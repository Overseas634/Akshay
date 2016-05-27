'use strict';

var app = require('../..');
var request = require('supertest');

var newfaculty;

describe('faculty API:', function() {

  describe('GET /api/facultys', function() {
    var facultys;

    beforeEach(function(done) {
      request(app)
        .get('/api/facultys')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          facultys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      facultys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/facultys', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/facultys')
        .send({
          name: 'New faculty',
          info: 'This is the brand new faculty!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newfaculty = res.body;
          done();
        });
    });

    it('should respond with the newly created faculty', function() {
      newfaculty.name.should.equal('New faculty');
      newfaculty.info.should.equal('This is the brand new faculty!!!');
    });

  });

  describe('GET /api/facultys/:id', function() {
    var faculty;

    beforeEach(function(done) {
      request(app)
        .get('/api/facultys/' + newfaculty._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          faculty = res.body;
          done();
        });
    });

    afterEach(function() {
      faculty = {};
    });

    it('should respond with the requested faculty', function() {
      faculty.name.should.equal('New faculty');
      faculty.info.should.equal('This is the brand new faculty!!!');
    });

  });

  describe('PUT /api/facultys/:id', function() {
    var updatedfaculty

    beforeEach(function(done) {
      request(app)
        .put('/api/facultys/' + newfaculty._id)
        .send({
          name: 'Updated faculty',
          info: 'This is the updated faculty!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedfaculty = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedfaculty = {};
    });

    it('should respond with the updated faculty', function() {
      updatedfaculty.name.should.equal('Updated faculty');
      updatedfaculty.info.should.equal('This is the updated faculty!!!');
    });

  });

  describe('DELETE /api/facultys/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/facultys/' + newfaculty._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when faculty does not exist', function(done) {
      request(app)
        .delete('/api/facultys/' + newfaculty._id)
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
