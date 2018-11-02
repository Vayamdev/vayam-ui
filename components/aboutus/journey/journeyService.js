rootModule.service('journeyService', [
    'globalFactory',
    function(globalFactory) {
    var cachedDataMilestones;
    var cachedDataSlides;

    // get the event data from backend
    this.getMilestones = function() {
        if (!cachedDataMilestones) {
            cachedDataMilestones = globalFactory.getStandardGetRequest('milestones');
        }
        return cachedDataMilestones;
    };

    this.getTestimonials = function() {
        if (!cachedDataSlides) {
            cachedDataSlides = globalFactory.getStandardGetRequest('testimonials');
        }
        return cachedDataSlides;
    }
}]);