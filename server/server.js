var express = require('express');
var Sequelize = require("sequelize");
var app = express();
var server = require ('http').createServer(app);
var models = require('./models');


var port = process.env.PORT || 3000;
app.set('port', port)

models.sequelize.sync().then(function() {
  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port, function() {
    console.log('Express server listening on port ' + server.address().port);
  });
});



require('./config/middleware.js') (app,express);
require('./config/routes.js') (app,express);


module.exports = app;