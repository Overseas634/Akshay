'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var subjectCtrlStub = {
  index: 'subjectCtrl.index',
  show: 'subjectCtrl.show',
  create: 'subjectCtrl.create',
  update: 'subjectCtrl.update',
  destroy: 'subjectCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var subjectIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './subject.controller': subjectCtrlStub
});

describe('subject API Router:', function() {

  it('should return an express router instance', function() {
    subjectIndex.should.equal(routerStub);
  });

  describe('GET /api/subjects', function() {

    it('should route to subject.controller.index', function() {
      routerStub.get
        .withArgs('/', 'subjectCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/subjects/:id', function() {

    it('should route to subject.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'subjectCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/subjects', function() {

    it('should route to subject.controller.create', function() {
      routerStub.post
        .withArgs('/', 'subjectCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/subjects/:id', function() {

    it('should route to subject.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'subjectCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/subjects/:id', function() {

    it('should route to subject.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'subjectCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/subjects/:id', function() {

    it('should route to subject.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'subjectCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
