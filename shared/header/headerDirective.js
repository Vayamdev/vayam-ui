rootModule.directive('vayamHeader', function(){
    return {
        restrict: 'A',
        templateUrl: '/shared/header/headerTemplate.html',
        scope: false,
        controller: ['$scope', '$route', function($scope, $route) {
            $scope.$on("$routeChangeSuccess", function(event, next, current) {
                $scope.selected = $route.current.activetab;
            });
        }]
    };
});