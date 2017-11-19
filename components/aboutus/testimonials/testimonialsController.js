rootModule.controller('testimonialsController', ['$scope', 'testimonialsService', function($scope, testimonials) {
    $scope.testimonials;
    testimonials.getTestimonials().then(function(response) {
        $scope.testimonials = response.data;
        }, function() {
            console.log('Error during team data fetching!');
        })
}]);
