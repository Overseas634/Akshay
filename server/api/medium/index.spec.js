'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var mediumCtrlStub = {
  index: 'mediumCtrl.index',
  show: 'mediumCtrl.show',
  create: 'mediumCtrl.create',
  update: 'mediumCtrl.update',
  destroy: 'mediumCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var mediumIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './medium.controller': mediumCtrlStub
});

describe('medium API Router:', function() {

  it('should return an express router instance', function() {
    mediumIndex.should.equal(routerStub);
  });

  describe('GET /api/mediums', function() {

    it('should route to medium.controller.index', function() {
      routerStub.get
        .withArgs('/', 'mediumCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/mediums/:id', function() {

    it('should route to medium.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'mediumCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/mediums', function() {

    it('should route to medium.controller.create', function() {
      routerStub.post
        .withArgs('/', 'mediumCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/mediums/:id', function() {

    it('should route to medium.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'mediumCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/mediums/:id', function() {

    it('should route to medium.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'mediumCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/mediums/:id', function() {

    it('should route to medium.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'mediumCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
