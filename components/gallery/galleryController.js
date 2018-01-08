rootModule.controller('galleryController', ['$scope', 'galleryService', '$timeout', function($scope, galleryService, $timeout) {
     $scope.gallery = [];
    galleryService.getGallery().then(function(response) {
        console.log(response);
        $scope.gallery = response.data;
    }, function() {
        console.log('Error during gallery data fetching!');
    });

    jQuery('body').on('click', '#links', function(event) {
        event = event || window.event;
        var target = event.target || event.srcElement,
            link = target.src ? target.parentNode : target,
            options = {index: link, event: event},
            links = this.getElementsByTagName('a');
        blueimp.Gallery(links, options);
    })
}]);
