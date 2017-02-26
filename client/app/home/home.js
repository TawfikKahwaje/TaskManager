angular.module('Task.home', [])
.controller('homeController', function($scope, $routeParams, Tasks, UserAuth, $window, $location, $mdDialog) {
	
	$scope.getTasks = function (date) {
		Tasks.getAllByDay(date)
		.then(function (tasks) {
			$scope.tasks = tasks;
			console.log(tasks);
		})
		.catch(function (err) {
			console.log(err)
		})
	}

	$scope.logout = function () {
		$window.localStorage['token'] = null;
		$location.path('/signin');
	}

	$scope.myDate = new Date();
	var date = praperDate($scope.myDate);
	$scope.getTasks(date);


	$scope.task = {};
	$scope.task.date = $scope.myDate;
	$scope.createTask = function () {
		$scope.task.startTime = praperTime($scope.task.startTime);
		$scope.task.endTime = praperTime($scope.task.endTime);
		$scope.task.date = praperDate(new Date($scope.myDate))
		console.log($scope.task);
		if($scope.task.startTime >= $scope.task.endTime){
			console.log('invalid time')
			return;
		}

		Tasks.create($scope.task)
		.then(function (task) {
			$scope.showModal = false;
			$scope.getTasks(praperDate($scope.myDate));
			$scope.task = {};
			$scope.task.date = $scope.myDate;
		})
		.catch(function (err) {
			console.log(err);
		})
		// console.log(startTime)
	}

	function praperTime(date) {
		date.setDate($scope.myDate.getDate());
		date.setFullYear($scope.myDate.getFullYear());
		date.setMonth($scope.myDate.getMonth());
		return date;
	}

	function praperDate(date) {
		var newDate = new Date(0);
		newDate.setMonth(date.getMonth()+1);
		newDate.setDate(date.getDate());
		newDate.setFullYear(date.getFullYear());
		return newDate.getFullYear() + '-' + newDate.getMonth() + '-'+ newDate.getDate();
	}

	$scope.showTask = function (taskId) {
		console.log(taskId);
	}

	$scope.changeDate = function () {
		$scope.getTasks(praperDate($scope.myDate));
		console.log(praperDate($scope.myDate));
	}

	$scope.changeStatus = function (newStatus, taskId) {
		console.log(newStatus,taskId)
		Tasks.modify(taskId, newStatus)
		.then(function (data) {
			$scope.getTasks(praperDate($scope.myDate));
		})
		.catch(function (err) {
			console.log(err)
		})
	}

	function updateTasks(task) {
		$scope.tasks.push(task)
	}

	$scope.sameDay = function(date) {
		if(praperDate(new Date(date)) === praperDate(new Date()))
			return true;
		return false
	}
	
	$scope.editDialog = function(taskId) {
		// if()

		for (var i = 0; i < $scope.tasks.length; i++) {
			if($scope.tasks[i].id === taskId){
				// console.log()
				if($scope.tasks[i].id === taskId){
					if($scope.tasks[i].editable){
						$scope.tasks[i].editable = false;
						var editableTask = {label : $scope.tasks[i].label, description: $scope.tasks[i].description}
						console.log(taskId, {label : $scope.tasks[i].label})
						Tasks.editone(taskId, editableTask)
						.then(function (data) {
							console.log(data)
						})
						.catch(function (err) {
							console.log(err)
						})
					}
					else{
						$scope.tasks[i].editable = true;
					}
				}
				// console.log($scope.tasks[i])
			}
		}

	    // $mdDialog.show({
	    //   controller: DialogController,
	    //   templateUrl: './app/home/edit.tmpl.html',
	    //   data: $scope.editTask,
	    //   parent: angular.element(document.body),
	    //   targetEvent: ev,
	    //   clickOutsideToClose:true,
	    //   fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
	    // })
	    // .then(function(editTask) {
	    //   $scope.status = 'You said the information was "' + answer + '".';
	    // }, function() {
	    //   $scope.status = 'You cancelled the dialog.';
	    // });
  };

  $scope.delete = function (taskId) {
  	Tasks.delete(taskId)
  	.then(function (data) {
  		for (var i = 0; i < $scope.tasks.length; i++) {
  			if($scope.tasks[i].id === taskId){
  				$scope.tasks.splice(i, 1);
  				return
  			}
  		}
  	})
  	.catch(function (err) {
  		console.log(err)
  	})
  }


});



