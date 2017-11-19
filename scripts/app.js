/* 
This file should only hold global declarations and global setting
related to app.
*/

var rootModule = angular.module('rootModule', [
    'ngRoute'
]);



/* 
This file should only hold routing settings for app
*/


rootModule.config(["$routeProvider", function($routeProvider) {
    $routeProvider.
    when("/home", {
        templateUrl: "components/home/homeView.html",
        controller: "homeController",
        activetab: 'home'
    })
    .when("/whatweare", {
        templateUrl: "components/aboutus/whatweare/whatweareView.html",
        controller: "whatweareController",
        activetab: 'aboutus'
    })
    .when("/journey", {
        templateUrl: "components/aboutus/journey/journeyView.html",
        activetab: 'aboutus'
    })
    .when("/team", {
        templateUrl: "components/aboutus/team/teamView.html",
        controller: "teamController",
        activetab: 'aboutus'
    })
    .when("/testimonials", {
        templateUrl: "components/aboutus/testimonials/testimonialsView.html",
        controller: "testimonialsController",
        activetab: 'aboutus'
    })
    .when("/contactus", {
        templateUrl: "components/contactus/contactusView.html",
        controller: "contactusController",
        activetab: 'contactus'
    })
    .when("/donate", {
        templateUrl: "components/donate/donateView.html",
        controller: "donateController",
        activetab: 'donate'
    })
    .otherwise({
        redirectTo: "/home"
    });
}]);



rootModule.controller('homeController', ['$scope', 'homeService', function($scope, homeService) {

    homeService.getThumbnails().then(function(response) {
        $scope.events = response.data;
    }, function() {
        console.log('Error during event data fetching!');
    });
}]);



rootModule.controller('teamController', ['$scope', 'teamService', function($scope, teamService) {    
    $scope.teamgroup = {};
    teamService.getStaff().then(function(response) {
            var teamdata = response.data;
            var key = 0;
            while(teamdata.length > 0) {
                ++key;
                $scope.teamgroup[key.toString()] = teamdata.splice(0, 4);
            }
        }, function() {
            console.log('Error during team data fetching!');
        })
}]);



rootModule.controller('whatweareController', ['$scope', function($scope) {
}]);



rootModule.controller('testimonialsController', ['$scope', 'testimonialsService', function($scope, testimonials) {
    $scope.testimonials;
    testimonials.getTestimonials().then(function(response) {
        $scope.testimonials = response.data;
        }, function() {
            console.log('Error during team data fetching!');
        })
}]);



rootModule.controller('contactusController', ['$scope', function($scope) {
}]);



rootModule.controller('donateController', ['$scope', function($scope) {
}]);



rootModule.service('homeService', ['$http', function($http) {

    // get the event data from backend
    this.getThumbnails = function() {
       return $http.get('http://localhost:3000/events');
    };
}]);



rootModule.service('teamService', ['$http', function($http) {
    
    // get the event data from backend
    this.getStaff = function() {
        return $http.get('http://localhost:3000/team');
    };
}]);
    


rootModule.service('testimonialsService', ['$http', function($http) {
    
    // get the event data from backend
    this.getTestimonials = function() {
        return $http.get('http://localhost:3000/testimonials');
    };
}]);
    


rootModule.directive('vayamHeader', function(){
    return {
        restrict: 'A',
        templateUrl: '/shared/header/headerTemplate.html',
        scope: true,
        controller: ['$scope', '$route', function($scope, $route) {
            $scope.selected = $route.current.activetab;
        }]
    };
});



rootModule.directive('vayamFooter', function(){
    return {
        restrict: 'A',
        templateUrl: '/shared/footer/footerTemplate.html',
        scope: true
    };
});



rootModule.directive('vayamMap', function(){
    return {
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        link: function (scope, ielement, attr) {
            var vayamcenter = new google.maps.LatLng(19.905004, 73.231295);
            var canvas = document.getElementById(attr.id);
        	var mapProp= {
        		center: vayamcenter,
        		zoom: 10
        	};

        	var map = new google.maps.Map(canvas, mapProp);
        	var marker = new google.maps.Marker({
        		position: vayamcenter,
        		animation:google.maps.Animation.BOUNCE
        	});
        	marker.setMap(map);
        }
    };
});
