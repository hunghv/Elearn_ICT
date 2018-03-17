app.controller('APIController', function ($scope, APIService) {
    getAll();

    function getAll() {
        var servCall = APIService.getSubs();
        servCall.then(function (d) {
            $scope.subscriber = d.data;
        }, function (error) {
            window.$log.error('Oops! Something went wrong while fetching the data.');
        });
    }
})
