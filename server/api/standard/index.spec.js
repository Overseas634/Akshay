'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var standardCtrlStub = {
  index: 'standardCtrl.index',
  show: 'standardCtrl.show',
  create: 'standardCtrl.create',
  update: 'standardCtrl.update',
  destroy: 'standardCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var standardIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './standard.controller': standardCtrlStub
});

describe('standard API Router:', function() {

  it('should return an express router instance', function() {
    standardIndex.should.equal(routerStub);
  });

  describe('GET /api/standards', function() {

    it('should route to standard.controller.index', function() {
      routerStub.get
        .withArgs('/', 'standardCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/standards/:id', function() {

    it('should route to standard.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'standardCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/standards', function() {

    it('should route to standard.controller.create', function() {
      routerStub.post
        .withArgs('/', 'standardCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/standards/:id', function() {

    it('should route to standard.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'standardCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/standards/:id', function() {

    it('should route to standard.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'standardCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/standards/:id', function() {

    it('should route to standard.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'standardCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
