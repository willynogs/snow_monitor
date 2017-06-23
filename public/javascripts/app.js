var app = angular.module('snowMonitor', []);

app.controller('MainCtrl', function($scope, $http){
    $scope.tests = [];

    $scope.getSN = function(){
        var data = {
            table: $scope.table,
            query: $scope.query || '',
            limit: $scope.limit || 10
        };
        $http.post('/api/servicenowtest', data)
            .then(res => {
                $scope.tests = res.data.body.result;
                console.log(res.data.body.result);
            });
    };
});
