var home = angular.module('home', []);

home.controller('homeController', ['$scope', 'homeService', function($scope, homeService) {
    $scope.events;

    // display thumbnails for latest three evenets
    function DisplayThumbnails(events) {
        $scope.events = events;
    }

    homeService.getThreeEvents(DisplayThumbnails);
}]);



home.service('homeService', ['$http', function($http) {

    // get the event data from backend 
    this.getThreeEvents = function(onsuccess) {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/events'
        }).then(function(response){
            onsuccess(response.data);
        }, function(error){
            console.log('Error during data fetching!');
        });
    };
}]);



var aboutus = angular.module('aboutus', []);

aboutus.controller('aboutusController', ['$scope', function($scope) {
}]);



var contactus = angular.module('contactus', []);
contactus.controller('contactusController', ['$scope', function($scope) {

}]);



var rootModule = angular.module('rootModule', [
    'ngRoute',
    'home',
    'aboutus',
    'contactus'
]);



rootModule.config(["$routeProvider", function($routeProvider) {
    $routeProvider.
    when("/home", {
        templateUrl: "components/home/homeView.html",
        controller: "homeController",
        activetab: 'home'
    })
    .when("/aboutus", {
        templateUrl: "components/aboutus/aboutusView.html",
        controller: "aboutusController",
        activetab: 'aboutus'
    })
    .when("/contactus", {
        templateUrl: "components/contactus/contactusView.html",
        controller: "contactusController",
        activetab: 'contactus'
    })
    .otherwise({
        redirectTo: "/home"
    });
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
