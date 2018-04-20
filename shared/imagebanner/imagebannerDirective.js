rootModule.directive('imageBanner', function(){
    return {
        restrict: 'E',
        templateUrl: '/shared/imagebanner/imageBannerTemplate.html',
        scope: true,
        controller: ['$scope', '$route', function($scope, $route) {
            $scope.selected = $route.current.activetab;
            console.log($scope.selected);
        }]
    };
});