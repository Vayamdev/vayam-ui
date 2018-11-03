rootModule.controller('journeyController',[
    '$scope',
    'journeyService',
    'globalFactory',
    function($scope, journeyService, globalFactory) {
        var isContentFul = appConfig.useContentFul;
        $scope.myInterval = 5000;
        $scope.slides = [];
        $scope.crisis = [];
        $scope.conceptnote = [];
        $scope.projects = [];
        $scope.displayeventgroup = [];

        // fetch static data for this page. 
        globalFactory.getStaticData(function(response) {
            $scope.title = response.journey.title;
            $scope.bannertext = response.journey.bannertext;
            $scope.bannerUrl = response.journey.bannerimage;
        });

        // get other page details
        journeyService.getTestimonials().then(function(response) {
            $scope.slides = globalFactory.resolveLinksIfContentFul(
                response.data.items ? response.data.items : response.data
            );
        }, function() {
            console.log('Error during slide data fetching!');
        });

        journeyService.getMilestones().then(function(response) {
            $scope.milestones = globalFactory.resolveLinksIfContentFul(
                response.data.items ? response.data.items : response.data
            );
        }, function() {
            console.log('Error during projects data fetching!');
        });
    }
]);