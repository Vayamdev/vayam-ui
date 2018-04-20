rootModule.directive('imageBanner', function(){
    return {
        restrict: 'E',
        templateUrl: '/shared/imagebanner/imageBannerTemplate.html',
        scope: true,
        controller: ['$scope', '$route', function($scope, $route) {
            $scope.bradecrume = $route.current.activepage;
            $scope.activepage = $route.current.activetab;
            if ($scope.bradecrume.indexOf( $scope.activepage) === -1) {
                $scope.bradecrume = $scope.activepage + " / " + $scope.bradecrume;
            }
        }]
    };
});