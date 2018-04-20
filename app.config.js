/* 
This file should only hold routing settings for app
*/


rootModule.config(["$routeProvider", function($routeProvider) {
    $routeProvider.
    when("/home", {
        templateUrl: "components/home/homeView.html",
        controller: "homeController",
        activetab: 'Home',
        activepage: 'Home'
    })
    .when("/impact", {
        templateUrl: "components/impact/impactView.html",
        controller: "impactController",
        activetab: 'Impact',
        activepage: 'Impact'
    })    
    .when("/whatweare", {
        templateUrl: "components/aboutus/whatweare/whatweareView.html",
        controller: "whatweareController",
        activetab: 'About Us',
        activepage: 'What We Are'
    })
    .when("/journey", {
        templateUrl: "components/aboutus/journey/journeyView.html",
        controller: "journeyController",
        activetab: 'About Us',
        activepage: 'Journey'
    })
    .when("/team", {
        templateUrl: "components/aboutus/team/teamView.html",
        controller: "teamController",
        activetab: 'About Us',
        activepage: 'home'
    })
    .when("/testimonials", {
        templateUrl: "components/aboutus/testimonials/testimonialsView.html",
        controller: "testimonialsController",
        activetab: 'About Us',
        activepage: 'Home'
    })
    .when("/contactus", {
        templateUrl: "components/contactus/contactusView.html",
        controller: "contactusController",
        activetab: 'Contact Us',
        activepage: 'Contact Us'
    })
    .when("/donate", {
        templateUrl: "components/donate/donateView.html",
        controller: "donateController",
        activetab: 'Donate',
        activepage: 'Donate'
    })
    .when("/project/:projectid", {
        templateUrl: "components/project/projectView.html",
        controller: "projectController",
        activetab: 'Projects',
        activepage: 'Projects'
    })
    .when("/news", {
        templateUrl: "components/news/newsView.html",
        controller: "newsController",
        activetab: 'News',
        activepage: 'News'
    })
    .when("/gallery", {
        templateUrl: "components/gallery/galleryView.html",
        controller: "galleryController",
        activetab: 'About Us',
        activepage: 'Gallery'
    })
    .when("/news/:newsid", {
        templateUrl: "components/news/newsdetails/newsDetailsView.html",
        controller: "newsController",
        activetab: 'news',
        activepage: 'Home'
    })
    .otherwise({
        redirectTo: "/home"
    });
}]);
