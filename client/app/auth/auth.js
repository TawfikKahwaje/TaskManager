angular.module('Task.auth', [])
  .controller('AuthController', function ($scope, $window, $location, UserAuth) {
 //===============================================================================================
 /*                                         AuthController                                       */
 //===============================================================================================
    $scope.err = false;
    $scope.signin = function () {
        UserAuth.signin($scope.user)
        .then(function (data) {
            $scope.err = false;
            $window.localStorage['token'] = data.token;
            $location.path('/home');
        })
        .catch(function (err) {
            $scope.message = err.data
            $scope.err = true;
            console.log(err);
        })
    }

    $scope.signup = function () {
        if($scope.user.password !== $scope.user.confirmpassword){
            $scope.err = true;
            $scope.message = 'passwords not match'
            return;
        }
        UserAuth.signup($scope.user)
        .then(function (data) {
            // if(!res.success)
            //     throw(new Error('User already exist!'));
            $scope.err = false;
            $window.localStorage['token'] = data.token;
            $location.path('/home');
        })
        .catch(function (err) {
            $scope.err = true;
            $scope.message = err.data
            console.log(err);
        })
    }
})


