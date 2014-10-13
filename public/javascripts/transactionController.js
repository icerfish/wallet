/**
 * Created by dylanturney on 12/10/14.
 */

angular.module('myApp', []).controller('transactionController', ['$scope','$http', function($scope,$http) {
    var site = "http://localhost:3000";
    var page = "/transactions";
    $http.get(site + page)
        .success(function(response){
            console.log("Response: " + JSON.stringify(response));
            $scope.transactions = response;

            console.log("trans: " + JSON.stringify($scope.transactions));
        });

    $scope.amount = 0;

    $scope.options = [
        {name:'Add', addition: true},
        {name:'Remove', addition: false}
    ];

    $scope.selectedOption = $scope.options[0];

    $scope.getTotal = function() {
        var total = 0;
        if(typeof $scope.transactions != 'undefined')
            for(var i = 0; i < $scope.transactions.length; i++){
                var transaction = $scope.transactions[i];
                if(transaction.addition){
                    total += transaction.amount;
                } else {
                    total -= transaction.amount;
                }
            }
        return total;
    };

    $scope.getMinValue = function() {
        return 0.01;
    };

    $scope.getMaxValue = function() {
        if(!$scope.selectedOption.addition)
            return $scope.getTotal();
        else
            return null;
    };

    $scope.postTransaction = function() {

        var dataObject = {
            amount : $scope.amount,
            addition  : $scope.selectedOption.addition
        };

        console.log("Data Obj: " + JSON.stringify(dataObject));

        $http.post('/transactions', dataObject).
            success(function(data, status, headers, config) {
                console.log("Data: " + JSON.stringify(data));
                $scope.transactions.push(data);
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    }
}]);