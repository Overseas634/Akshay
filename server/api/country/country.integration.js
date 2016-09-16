'use strict';

var app = require('../..');
var request = require('supertest');

var newdepartment;

describe('country API:', function() {

  describe('GET /api/countries', function() {
    var departments;

    beforeEach(function(done) {
      request(app)
        .get('/api/countries')
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

  describe('POST /api/countries', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/countries')
        .send({
          name: 'New country',
          info: 'This is the brand new country!!!'
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

    it('should respond with the newly created country', function() {
      newdepartment.name.should.equal('New country');
      newdepartment.info.should.equal('This is the brand new country!!!');
    });

  });

  describe('GET /api/countries/:id', function() {
    var country;

    beforeEach(function(done) {
      request(app)
        .get('/api/countries/' + newcountry._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          country = res.body;
          done();
        });
    });

    afterEach(function() {
      country = {};
    });

    it('should respond with the requested country', function() {
      country.name.should.equal('New country');
      country.info.should.equal('This is the brand new department!!!');
    });

  });

  describe('PUT /api/departments/:id', function() {
    var updatedcountry

    beforeEach(function(done) {
      request(app)
        .put('/api/countries/' + newcountry._id)
        .send({
          name: 'Updated country',
          info: 'This is the updated country!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedcountry = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedcountry = {};
    });

    it('should respond with the updated country', function() {
      updatedcountry.name.should.equal('Updated country');
      updatedcountry.info.should.equal('This is the updated country!!!');
    });

  });

  describe('DELETE /api/countries/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/countries/' + newcountry._id)
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
        .delete('/api/countries/' + newcountry._id)
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
