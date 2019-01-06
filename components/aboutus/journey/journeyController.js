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
            var data;
            data = globalFactory.resolveLinksIfContentFul(response).filter(data => data.pageName === 'journey')[0];
    
            $scope.title = data.title;
            $scope.bannertext =data.text;
            $scope.bannerUrl =data.image;
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
            var milestones = globalFactory.resolveLinksIfContentFul(
                response.data.items ? response.data.items : response.data
            );
            $scope.milestones = globalFactory.sortObjectsByValues(milestones, 'year', 'asc');
        }, function() {
            console.log('Error during projects data fetching!');
        });
    }
]);