'use strict';

var app = require('../..');
var request = require('supertest');

var newdepartment;

describe('city API:', function() {

  describe('GET /api/cities', function() {
    var departments;

    beforeEach(function(done) {
      request(app)
        .get('/api/cities')
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

  describe('POST /api/cities', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/cities')
        .send({
          name: 'New city',
          info: 'This is the brand new city!!!'
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

    it('should respond with the newly created city', function() {
      newdepartment.name.should.equal('New city');
      newdepartment.info.should.equal('This is the brand new city!!!');
    });

  });

  describe('GET /api/cities/:id', function() {
    var city;

    beforeEach(function(done) {
      request(app)
        .get('/api/cities/' + newcity._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          city = res.body;
          done();
        });
    });

    afterEach(function() {
      city = {};
    });

    it('should respond with the requested city', function() {
      city.name.should.equal('New city');
      city.info.should.equal('This is the brand new department!!!');
    });

  });

  describe('PUT /api/cities/:id', function() {
    var updatedcity

    beforeEach(function(done) {
      request(app)
        .put('/api/cities/' + newcity._id)
        .send({
          name: 'Updated city',
          info: 'This is the updated city!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedcity = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedcity = {};
    });

    it('should respond with the updated city', function() {
      updatedcity.name.should.equal('Updated city');
      updatedcity.info.should.equal('This is the updated city!!!');
    });

  });

  describe('DELETE /api/cities/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/cities/' + newcity._id)
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
        .delete('/api/cities/' + newcity._id)
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
