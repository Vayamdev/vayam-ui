rootModule.controller('homeController', [
    '$scope',
    'homeService', 
    'globalFactory',
    'modalFactory', 
    function($scope, homeService, globalFactory, modalFactory) {
        $scope.myInterval = 3000;
        $scope.slides = [];
        $scope.displayeventgroup = [];
        $scope.noWrapSlides = false;
        $scope.noWrapEvents = false;
        
        // fetch static data for this page. 
        $scope.crisis = [];
        $scope.conceptnote = [];
        $scope.projects = [];
        globalFactory.getStaticData(function(response) {
            $scope.crisis = response.crisis;
            $scope.conceptnote = response.conceptnote;      
        });
    
        // get slides data
        homeService.getSlides().then(function(response) {
            $scope.slides = globalFactory.resolveLinksIfContentFul(response.data.items);
        }, function() {
            console.log('Error during slide data fetching!');
        });

        // get projects data
        homeService.getProjects().then(function(response) {
            var projectData = angular.copy(response.data);
            projectData = globalFactory.resolveLinksIfContentFul(projectData.items, 'icon');
            globalFactory.truncateData(projectData, 'shortDescription', 250);
            $scope.projects = projectData;
        }, function() {
            console.log('Error during projects data fetching!');
        });    

        // get events data
        homeService.getThumbnails().then(function(response) {
            var events = angular.copy(response.data);
            events = globalFactory.resolveLinksIfContentFul(events.items);
            events = globalFactory.resolveParasIfContentFul(events, 'longDescription');
            globalFactory.truncateData(events, 'shortDescription', 120);
            var sortedEvents = globalFactory.sortObjectsByDates(events, 'date');
            while (sortedEvents.length) {
                $scope.displayeventgroup.push(sortedEvents.splice(0, 3));
            }
        }, function() {
            console.log('Error during event data fetching!');
        });

        $scope.open = function (event) {
            modalFactory.modalOpen({
                header: event.name,
                description: event.longDescription,
                image: event.image
            });
        }
    }
]);
