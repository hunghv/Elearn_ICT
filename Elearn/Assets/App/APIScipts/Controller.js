//var app = angular.module("APIModule", []);;
app.controller("APIController", function ($scope, apiService) {
    getAll();

    function getAll() {
        debugger;
        var servCall = apiService.getSubs();
        servCall.then(function (d) {
            $scope.subscriber = d.data;
        }, function (error) {
            window.$log.error("Oops! Something went wrong while fetching the data." + error);
        });
    }
})
