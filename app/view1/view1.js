angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope','$location', '$rootScope', function ($scope,$location, $rootScope) {
        $scope.inputs = [];
        $scope.failed = '';

        for (item in localStorage) {

            // Parse the JSON string and add to to contacts array
            var newItem = JSON.parse(localStorage[item]);
            $scope.inputs.push(newItem);

        }

        $scope.login = function () {
            if (!$scope.loginForm.$error.required) {
                var request = {
                    usernameLogin: $scope.usernameLogin,
                    passwordLogin: $scope.passwordLogin
                };
                console.log(request);
                $scope.inputs.forEach(function (item, index, array) {
                    if (request.usernameLogin == item.email && request.passwordLogin == item.password) {

                        console.log('ok');
                        $location.path('/home')
                    } else {
                        console.log('fail')
                    }
                });

            }
        }


    }]);