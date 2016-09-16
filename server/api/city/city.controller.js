/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/cities              ->  index
 * POST    /api/cities              ->  create
 * GET     /api/cities/:id          ->  show
 * PUT     /api/cities/:id          ->  update
 * DELETE  /api/cities/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var city = require('./city.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of departments
exports.index = function(req, res) {
  city.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single city from the DB
exports.show = function(req, res) {
  city.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new city in the DB
exports.create = function(req, res) {
  city.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing city in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  city.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a city from the DB
exports.destroy = function(req, res) {
  city.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
