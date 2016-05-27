'use strict';

var app = require('../..');
var request = require('supertest');

var newsubject;

describe('subject API:', function() {

  describe('GET /api/subjects', function() {
    var subjects;

    beforeEach(function(done) {
      request(app)
        .get('/api/subjects')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          subjects = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      subjects.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/subjects', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/subjects')
        .send({
          name: 'New subject',
          info: 'This is the brand new subject!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newsubject = res.body;
          done();
        });
    });

    it('should respond with the newly created subject', function() {
      newsubject.name.should.equal('New subject');
      newsubject.info.should.equal('This is the brand new subject!!!');
    });

  });

  describe('GET /api/subjects/:id', function() {
    var subject;

    beforeEach(function(done) {
      request(app)
        .get('/api/subjects/' + newsubject._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          subject = res.body;
          done();
        });
    });

    afterEach(function() {
      subject = {};
    });

    it('should respond with the requested subject', function() {
      subject.name.should.equal('New subject');
      subject.info.should.equal('This is the brand new subject!!!');
    });

  });

  describe('PUT /api/subjects/:id', function() {
    var updatedsubject

    beforeEach(function(done) {
      request(app)
        .put('/api/subjects/' + newsubject._id)
        .send({
          name: 'Updated subject',
          info: 'This is the updated subject!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedsubject = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedsubject = {};
    });

    it('should respond with the updated subject', function() {
      updatedsubject.name.should.equal('Updated subject');
      updatedsubject.info.should.equal('This is the updated subject!!!');
    });

  });

  describe('DELETE /api/subjects/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/subjects/' + newsubject._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when subject does not exist', function(done) {
      request(app)
        .delete('/api/subjects/' + newsubject._id)
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
