/**
 * Created by helix on 11/9/2016.
 */
angular.module('home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'homeCtrl'
        });
    }])
    .controller('homeCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {


    }]);

