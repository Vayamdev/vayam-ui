rootModule.controller('galleryController', ['$scope', 'galleryService', function($scope, galleryService) {
    $scope.gallery = [];
    galleryService.getGallery().then(function(response) {
        console.log(response);
        $scope.gallery = response.data;
    }, function() {
        console.log('Error during gallery data fetching!');
    });
}]);
