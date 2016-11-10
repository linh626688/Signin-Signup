angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])
    .directive('checkPassword', [function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {
                function customValidator(ngModelValue) {
                    if (/[A-Z]/.test(ngModelValue)) {
                        ctrl.$setValidity('uppercaseValidator', true);
                    } else {
                        ctrl.$setValidity('uppercaseValidator', false);
                    }
                    if (/[0-9]/.test(ngModelValue)) {
                        ctrl.$setValidity('numberValidator', true);
                    } else {
                        ctrl.$setValidity('numberValidator', false);
                    }
                    console.log(ngModelValue);
                    return ngModelValue;
                }

                ctrl.$parsers.push(customValidator);
            }
        };
    }])
    .controller('View2Ctrl', ['$scope', '$location', function ($scope, $location) {
        $scope.users = [];
        $scope.failed = '';
        for (item in localStorage) {
            var newItem = JSON.parse(localStorage[item]);
            $scope.users.push(newItem);
        }
        $scope.addUser = function () {
            if (!$scope.registerForm.$error.required) {
                $scope.failed = '';
                var newUser = {
                    id: localStorage.length,
                    email: $scope.username,
                    password: $scope.password
                };
                localStorage.setItem('item' + localStorage.length, JSON.stringify(newUser));
                $scope.users.push(newUser);
                $location.path('/view1')

            }
            else {
                $scope.failed = 'All fields must be filled.';
            }

        }
        $scope.checkInValid = function () {
            if ($scope.registerForm.email.$invalid ||
                $scope.registerForm.password.$invalid) {
                return true;
            }
            return false;

        }

    }]);
