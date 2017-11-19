rootModule.service('testimonialsService', ['$http', function($http) {
    
    // get the event data from backend
    this.getTestimonials = function() {
        return $http.get('http://localhost:3000/testimonials');
    };
}]);
    