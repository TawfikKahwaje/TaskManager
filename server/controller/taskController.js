var models = require('../models');
var repsonseHandler = require('../config/helpers.js').repsonseHandler;

module.exports = {
	createTask : function (req, res, next) {
		models.Task.create({
			label : req.body.label,
			description : req.body.description,
			startTime : new Date(req.body.startTime),
			endTime : req.body.endTime,
			status : 'on-hold',
			date : new Date(req.body.date) ,
			UserUserid : req.user
		})
		.then(function (task) {
			repsonseHandler(null, req, res, {status: 200, returnObj: task }, next);
		})
		.catch(function (err) {
			res.status(500).send(err);
		})
	},
	deleteTask : function (req, res, next) {
		models.Task.destroy({
			where : { id: req.params.task_id }
		})
		.then(function () {
			repsonseHandler(null, req, res, {status: 200, returnObj: {sucsecc : true} }, next);
		})
		.catch(function (err) {
			res.send(err);
		})
	},
	modifyTask : function (req, res, next) {
		console.log('req.body.label', req.body.label)
		console.log('req.body.description', req.body.description)
		console.log('req.params.task_id', req.params.task_id)
		models.Task.update(
		  { label: req.body.label,
		  	description : req.body.description },
		  { where: { id: req.params.task_id } }
		)
		.then(function (task) {
			// task.label = req.body.label,
			// task.description = req.body.description
			// task.save();
			res.send(task);
		})
		.catch(function (err) {
			res.send(err);
		})
	},
	changeStatus : function (req, res, next) {
		models.Task.update(
		  { status: req.body.status },
		  { where: { id: req.params.task_id } }
		)
		.then(function (task) {
			// task.status = req.body.status
			// switch (req.body.status){
			// 	case 'satrt' :
			// 		task.actualStartTime = new Date();
			// 		break;
			// 	case 'done' :
			// 		task.actualEndTime = new Date();
			// 		break;
			// }
			repsonseHandler(null, req, res, {status: 200, returnObj: {sucsecc : true} }, next);


		})
		.catch(function (err) {
			console.log(err);
			res.send(err);
		})
	},
	editone : function (req, res, next) {
		models.Task.update(
		  { label: req.body.label,
		  	description : req.body.description },
		  { where: { id: req.params.task_id } }
		)
		.then(function (task) {
			repsonseHandler(null, req, res, {status: 200, returnObj: {sucsecc : true} }, next);

		})
		.catch(function (err) {
			console.log(err);
			res.send(err);
		})
	},
	getAll : function (req, res, next) {
		console.log('req.user :',req.user);
		models.Task.findAll({
			where : {
				UserUserid : req.user
			}
		})
		.then(function (tasks) {
			repsonseHandler(null, req, res, {status: 200, returnObj: tasks }, next);
			
		})
		.catch(function (err) {
			res.send(err);
		})
	},
	getAllByDay : function (req, res, next) {
		models.Task.findAll({
			where : {
				UserUserid : req.user,
				date: {
					$eq: new Date(req.body.date)
					// $gt: new Date(new Date() - 24 * 60 * 60 * 1000)
				}
			}
		})
		.then(function (tasks) {
			repsonseHandler(null, req, res, {status: 200, returnObj: tasks }, next);
		})
		.catch(function (err) {
			res.send(err);
		})
	}
}