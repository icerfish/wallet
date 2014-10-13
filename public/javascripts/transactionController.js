/**
 * Created by dylanturney on 12/10/14.
 */

var app = angular.module('myApp', []).controller('transactionController', ['$scope','$http', function($scope,$http) {
    $http.get("/transactions/all") //Gets the transactions from Server
        .success(function(response){
            $scope.transactions = response;
        });

    $scope.amount = 0; //Sets amount to 0

    $scope.options = [ //Options for Select
        {name:'Add', addition: true},
        {name:'Remove', addition: false}
    ];

    $scope.selectedOption = $scope.options[0]; //Sets current option

    $scope.getTotal = function() { //Grabs total from Transactions
        var total = 0;
        if(typeof $scope.transactions != 'undefined')
            for(var i = 0; i < $scope.transactions.length; i++){
                var transaction = $scope.transactions[i];
                if(transaction.addition){ // Checks to see if transaction is addition of subtraction
                    total += transaction.amount; //Adds transaction amount
                } else {
                    total -= transaction.amount; //Subtracts transaction amount
                }
            }
        return total; //Returns total
    };

    $scope.getMinValue = function() {
        return 0.01; //Set to 0.01 so value can never be 0
    };

    $scope.getMaxValue = function() {
        if(!$scope.selectedOption.addition) //If subtraction return total amount in wallet else return null
            return $scope.getTotal();
        else
            return null;
    };

    $scope.postTransaction = function() { //Post transaction to server

        var dataObject = {
            amount : $scope.amount,
            addition  : $scope.selectedOption.addition
        };

        $http.post('/transactions/add', dataObject).
            success(function(data, status, headers, config) { //If transaction was successful add to Wallet
                console.log("Data: " + JSON.stringify(data));
                $scope.transactions.push(data);
            }).
            error(function(data, status, headers, config) {
                //Server error handling typically should go here
            });
    };

    $scope.resetTransactions = function(){ //Places
        $http.post('/transactions/reset').
            success(function(data, status, headers, config) {
                //Server will redirect to home
            }).
            error(function(data, status, headers, config) {
                //Server error handling typically should go here

            });
    }
}]);

//The below code is taken from Stackoverflow User: Guillaume86
//Source: http://stackoverflow.com/a/16242433/1627272


function isEmpty(value) {
    return angular.isUndefined(value) || value === '' || value === null || value !== value;
}

app.directive('ngMin', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {
            scope.$watch(attr.ngMin, function () {
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            var minValidator = function (value) {
                var min = scope.$eval(attr.ngMin) || 0;
                if (!isEmpty(value) && value < min) {
                    ctrl.$setValidity('ngMin', false);
                    return undefined;
                } else {
                    ctrl.$setValidity('ngMin', true);
                    return value;
                }
            };

            ctrl.$parsers.push(minValidator);
            ctrl.$formatters.push(minValidator);
        }
    };
});

app.directive('ngMax', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {
            scope.$watch(attr.ngMax, function () {
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            var maxValidator = function (value) {
                var max = scope.$eval(attr.ngMax) || Infinity;
                if (!isEmpty(value) && value > max) {
                    ctrl.$setValidity('ngMax', false);
                    return undefined;
                } else {
                    ctrl.$setValidity('ngMax', true);
                    return value;
                }
            };

            ctrl.$parsers.push(maxValidator);
            ctrl.$formatters.push(maxValidator);
        }
    };
});