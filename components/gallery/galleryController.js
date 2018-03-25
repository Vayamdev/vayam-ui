rootModule.controller('galleryController', ['$scope', 'galleryService', '$timeout', function($scope, galleryService, $timeout) {
    $scope.gallery = [];
    galleryService.getGallery().then(function(response) {
        console.log(response);
        $scope.gallery = response.data;
        setTimeout(function() {
            lightGallery(document.getElementById('lightgallery'));
        }, 0);
    }, function() {
        console.log('Error during gallery data fetching!');
    });
}]);