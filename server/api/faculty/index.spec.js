'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var facultyCtrlStub = {
  index: 'facultyCtrl.index',
  show: 'facultyCtrl.show',
  create: 'facultyCtrl.create',
  update: 'facultyCtrl.update',
  destroy: 'facultyCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var facultyIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './faculty.controller': facultyCtrlStub
});

describe('faculty API Router:', function() {

  it('should return an express router instance', function() {
    facultyIndex.should.equal(routerStub);
  });

  describe('GET /api/facultys', function() {

    it('should route to faculty.controller.index', function() {
      routerStub.get
        .withArgs('/', 'facultyCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/facultys/:id', function() {

    it('should route to faculty.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'facultyCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/facultys', function() {

    it('should route to faculty.controller.create', function() {
      routerStub.post
        .withArgs('/', 'facultyCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/facultys/:id', function() {

    it('should route to faculty.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'facultyCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/facultys/:id', function() {

    it('should route to faculty.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'facultyCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/facultys/:id', function() {

    it('should route to faculty.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'facultyCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
