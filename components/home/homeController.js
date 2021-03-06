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
        $scope.highlights = [];
        globalFactory.getStaticData(function(response) {
            var data;
            data = globalFactory.resolveLinksIfContentFul(response).filter(data => data.pageName === 'home')[0];
            data = globalFactory.resolveParasIfContentFul([data], 'text');
            console.log(data[0].meta);
            $scope.highlights = data[0].meta.highlights;
            $scope.conceptnote = data[0].text;
            $scope.crisis = data.crisis;   
        });
    
        // get slides data
        homeService.getSlides().then(function(response) {
            $scope.slides = globalFactory.resolveLinksIfContentFul(
                response.data.items ? response.data.items : response.data
            );
        }, function() {
            console.log('Error during slide data fetching!');
        });

        // get projects data
        homeService.getProjects().then(function(response) {
            var projectData = angular.copy(response.data);
            projectData = globalFactory.resolveLinksIfContentFul(
                projectData.items ? projectData.items : projectData, 
                'icon'
            );
            globalFactory.truncateData(projectData, 'shortDescription', 250);
            $scope.projects = projectData;
        }, function() {
            console.log('Error during projects data fetching!');
        });    

        // get events data
        homeService.getThumbnails().then(function(response) {
            var events = angular.copy(response.data);
            events = globalFactory.resolveLinksIfContentFul(events.items ? events.items : events);
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
