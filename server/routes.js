/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/departments', require('./api/department'));
  app.use('/api/mediums', require('./api/medium'));
  app.use('/api/standards', require('./api/standard'));
  app.use('/api/facultys', require('./api/faculty'));

  app.use('/api/subjects', require('./api/subject'));
  app.use('/api/countries', require('./api/country'));
  app.use('/api/cities', require('./api/city'));
  app.use('/api/states', require('./api/state'));
  app.use('/api/locations', require('./api/location'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
