var helpers = require('./helpers.js');
var models  = require('../models');

var user = require('../controller/userController.js');
var task = require('../controller/taskController.js');

module.exports = function(app, express) {
	app.post('/api/users/signup', user.signup);
	app.post('/api/users/signin', user.signin);
	app.use(helpers.decode);

	app.post('/api/tasks/create', task.createTask);
	app.get('/api/tasks/:task_id/delete', task.deleteTask);
	app.post('/api/tasks/:task_id/modify', task.modifyTask);
	app.post('/api/tasks/:task_id/changestatus', task.changeStatus);
	app.get('/api/tasks/getalltask', task.getAll);
	app.post('/api/tasks/getalltaskbyday', task.getAllByDay);
	app.post('/api/tasks/:task_id/editone', task.editone);

	//error handling
	app.use(helpers.errorLogger);
	app.use(helpers.errorHandler);
};
