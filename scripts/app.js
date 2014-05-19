angular.module('githubEx', [])
  .controller('MainCtrl', ['$scope',
    function($scope) {
      $scope.viewSource = false;
      $scope.gistId = '4992826';
      $scope.result = '';
      $scope.files = [];
      $scope.toggleSource = function() {
        $scope.viewSource = !$scope.viewSource;
      };
      $scope.getFiles = function() {
        var gist = new Gh3.Gist({id: $scope.gistId});
        $scope.files = [];
        gist.fetchContents(function(err, res) {
          if(err) {
            $scope.$apply(function() {
              $scope.result = err.message;
            });
          } else {
            $scope.$apply(function() {
              $scope.result = '';
            });
          }
          gist.eachFile(function(file) {
            $scope.$apply(function() {
              $scope.files.push(file);
            });
          });
        });
      };
    }
  ]);
