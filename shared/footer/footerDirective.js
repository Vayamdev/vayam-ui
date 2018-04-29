rootModule.directive('vayamFooter', function(){
    return {
        restrict: 'A',
        templateUrl: '/shared/footer/footerTemplate.html',
        scope: true,
        controller: ['$scope', 'globalFactory', function($scope, globalFactory) {
            // fetch static data for this page. 
            globalFactory.getStaticData(function(response) {
                $scope.fb = response.socialnetwork.fb;
                // $scope.twitter = response.socialnetwork.twitter;
                $scope.youtube = response.socialnetwork.youtube;
                $scope.wordpress = response.socialnetwork.wordpress;

                $scope.footernote =  response.footernote;
            });
        }]
    };
});
