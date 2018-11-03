rootModule.controller('galleryController', ['$scope', 'galleryService', 'globalFactory', '$timeout', function($scope, galleryService, globalFactory, $timeout) {
    
    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannertext = response.gallery.bannertext;
        $scope.bannerUrl = response.gallery.bannerimage;
    });
    
    galleryService.getGallery().then(function(response) {
       var resolvedData = globalFactory.resolveLinksIfContentFul(
            response.data.items ? response.data.items : response.data
        );
        $scope.sorteddata = globalFactory.sortGalleryData(resolvedData);
        $scope.categories = Object.keys($scope.sorteddata);

        // Apply galary plugin
        setTimeout(function() {
            for (var i=0; i< $scope.categories.length; i++) {
                var pane = document.getElementById('gallary_' + i);
                lightGallery(pane);
            }
        }, 0);
    }, function() {
        console.log('Error during gallery data fetching!');
    });
}]);