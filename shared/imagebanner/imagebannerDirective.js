rootModule.directive('imageBanner', function(){
    return {
        restrict: 'E',
        templateUrl: '/shared/imagebanner/imageBannerTemplate.html',
        scope: true
    };
});