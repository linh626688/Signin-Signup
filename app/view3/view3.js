/**
 * Created by helix on 11/8/2016.
 */
(function () {
    angular.module('toDo', ['ngRoute'])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/view3', {
                templateUrl: 'view3/view3.html',
                controller: 'AppCtrl'
            });
        }])

        .controller('AppCtrl', ['$scope', function ($scope) {

            $scope.contacts = [];  // Array that will hold all contacts
            $scope.failed = '';    // A message displayed if the form fails to submit

            // For each item in local storage...
            for (item in localStorage) {

                // Parse the JSON string and add to to contacts array
                var newItem = JSON.parse(localStorage[item]);
                $scope.contacts.push(newItem);

            }

            // Submit new contact with values from the form fields, then reset values of the fields
            $scope.addContact = function () {

                // Angular has special directives for forms, and a form name attribute allows that form to be accessed through the scope, which is where we get '$scope.addContactForm'
                // Read more here: docs.angularjs.org/api/ng/directive/form

                // If all required fields are complete
                if (!$scope.addContactForm.$error.required) {

                    // Remove warning
                    $scope.failed = '';

                    // Store contact data in an object
                    var newContact = {
                        id: localStorage.length,                   // this id is used to
                        title: $scope.newTitle,
                        fullName: $scope.newFullName,
                        dollarAmount: $scope.newDollarAmount,
                        description: $scope.newDescription
                    };

                    // Add contact object to localStorage as the value to a new property
                    localStorage.setItem('item' + localStorage.length, JSON.stringify(newContact));

                    // Add new contact object to the model by adding it to the contacts array
                    $scope.contacts.push(newContact);

                    // Reset the inputs values for the form
                    $scope.newTitle = '';
                    $scope.newFullName = '';
                    $scope.newDollarAmount = '';
                    $scope.newDescription = '';
                } else {
                    // Add warning
                    $scope.failed = 'All fields must be filled.';
                }

            };

            $scope.deleteContact = function (index, item) {

                // index param is an ngRepeat variable
                // Read more here: docs.angularjs.org/api/ng/directive/ngRepeat

                // Delete item from localStorage
                localStorage.removeItem('item' + item.id);

                // Remove item from the contacts array
                $scope.contacts.splice(index, 1);

            }
            // When the delete button is pressed, it will find the corresponding item's index from localStorage and splice it
            $scope.onItemDelete = function (item) {
                $scope.contacts.splice($scope.contacts.indexOf(item), 1);
            }
        }]);
})();
