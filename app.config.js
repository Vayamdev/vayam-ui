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
