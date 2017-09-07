var app = angular.module('snowMonitor', []);

app.controller('MainCtrl', function($scope, $http, $interval){
    $scope.tests = [];
    $scope.changes = [];
    $scope.incidents = [];

    $scope.init = function(){
        tick();
        $interval(tick, 1000);
        changeRest();
        incidentRest();
    };

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

    $scope.getChange = function(){
      changeRest();
    };

    /* ~~~~~~~~~~~~~~~~~~~~~~~ */
    /* ~~ private functions ~~ */
    /* ~~~~~~~~~~~~~~~~~~~~~~~ */

    function tick(){
        $scope.time = moment().format('MMMM Do YYYY, h:mm:ss a');
    }

    function changeRest() {
      $http.get('/api/change')
        .then(res => {
          $scope.changes = res.data;
        });
    }

    function incidentRest() {
      $http.get('/api/incident')
        .then(res => {
          $scope.incidents = res.data;
          console.log(res.data);
        });
    }
});
