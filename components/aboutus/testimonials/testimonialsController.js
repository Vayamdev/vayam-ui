rootModule.controller('testimonialsController', ['$scope', 'testimonialsService', 'globalFactory', function($scope, testimonials, globalFactory) {
    $scope.testimonials;
    $scope.bannerUrl = 'http://placehold.it/1146x400';
    $scope.bannertext = '';

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannertext = response.testimonialsbannertext;
    });    

    testimonials.getTestimonials().then(function(response) {
        $scope.testimonials = response.data;
        }, function() {
            console.log('Error during team data fetching!');
        })
}]);
