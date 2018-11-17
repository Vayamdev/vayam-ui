rootModule.directive('vayamFooter', function(){
    return {
        restrict: 'A',
        templateUrl: '/shared/footer/footerTemplate.html',
        scope: true,
        controller: ['$scope', 'globalFactory', function($scope, globalFactory) {
            // fetch static data for this page. 
            globalFactory.getStaticData(function(response) {
                $scope.footernote =  response.footernote;
            });
        }]
    };
});
