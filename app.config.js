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
        templateUrl: "components/projectDetails/projectDetailsView.html",
        controller: "projectDetailsController",
        activetab: 'Projects',
        activepage: 'Projects'
    })
    .when("/impact/:impactid", {
        templateUrl: "components/impactDetails/impactDetailsView.html",
        controller: "impactDetailsController",
        activetab: 'Impact',
        activepage: 'Impact'
    })
    .when("/gallery", {
        templateUrl: "components/aboutus/gallery/galleryView.html",
        controller: "galleryController",
        activetab: 'About Us',
        activepage: 'Gallery'
    })
    .when("/download", {
        templateUrl: "components/download/downloadView.html",
        controller: "downloadController",
        activetab: 'Download',
        activepage: 'Download'
    })
    .otherwise({
        redirectTo: "/home"
    });
}]);
