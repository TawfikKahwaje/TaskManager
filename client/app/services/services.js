angular.module('Task.services',[])

.factory('UserAuth',function ($http, $window, $location) {
	return{
		signin: function(user) {
			return $http({
				method:'POST',
				url:'/api/users/signin',
				data:user
			})
			.then(function (res) {
				return res.data
			})
		},
		signup: function(user) {
			return $http({
				method:'POST',
				url:'/api/users/signup',
				data:user
			})
			.then(function (res) {
				return res.data
			})
		},
		isAuth: function () {
			var token = $window.localStorage['token'];
			if(token === 'null' || token === 'undefined' || token === '')
				return false;
			else 
				return true
		}
	}
})
.factory('Tasks',function ($http, $window) {
	return{
		getAll: function() {
			return $http({
				method:'GET',
				url:'/api/tasks/getalltask'
			})
			.then(function (res) {
				return res.data;
			})
		},
		getAllByDay: function(date) {
			return $http({
				method:'POST',
				url:'/api/tasks/getalltaskbyday',
				data: {date : date}
			})
			.then(function (res) {
				return res.data;
			})
		},
		create: function(task) {
			return $http({
				method:'POST',
				url:'/api/tasks/create',
				data:task
			})
			.then(function (res) {
				return res.data;
			})
		},
		delete: function(taskId) {
			return $http({
				method:'GET',
				url:'/api/tasks/'+ taskId +'/delete'
			})
			.then(function (res) {
				return res.data;
			})
		},
		editone: function(taskId, task) {
			return $http({
				method:'POST',
				url:'/api/tasks/'+ taskId +'/editone',
				data: task
			})
			.then(function (res) {
				return res.data;
			})
		},
		modify: function(taskId, status) {
			return $http({
				method:'POST',
				url:'/api/tasks/'+ taskId +'/changestatus',
				data: {status : status}
			})
			.then(function (res) {
				return res.data;
			})
		}
	}
})
