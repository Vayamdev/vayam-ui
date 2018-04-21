rootModule.directive('imageBanner', function(){
    return {
        restrict: 'E',
        templateUrl: '/shared/imagebanner/imageBannerTemplate.html',
        scope: true,
        controller: ['$scope', '$route', function($scope, $route) {
            $scope.activepage = $route.current.activepage;
            $scope.activetab = $route.current.activetab;
            if ($scope.activetab.indexOf( $scope.activepage) === -1) {
                $scope.bradecrume = $scope.activetab + " / " + $scope.activepage;
            }
            else {
                $scope.bradecrume = $scope.activetab;
            }
        }]
    };
});