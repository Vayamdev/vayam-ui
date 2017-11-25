rootModule.controller('testimonialsController', ['$scope', 'testimonialsService', function($scope, testimonials) {
    $scope.testimonials;
    $scope.bannerUrl = 'http://placehold.it/1146x400';
    testimonials.getTestimonials().then(function(response) {
        $scope.testimonials = response.data;
        }, function() {
            console.log('Error during team data fetching!');
        })
}]);
