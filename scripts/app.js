/* 
This file should only hold global declarations and global setting
related to app.
*/

var rootModule = angular.module('rootModule', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'simplePagination'
]);

// constant for base URL. Change this on production server
rootModule.constant('baseUrl', 'http://localhost:3000');


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
        templateUrl: "components/project/projectView.html",
        controller: "projectController",
        activetab: 'Projects',
        activepage: 'Projects'
    })
    .when("/gallery", {
        templateUrl: "components/aboutus/gallery/galleryView.html",
        controller: "galleryController",
        activetab: 'About Us',
        activepage: 'Gallery'
    })
    .otherwise({
        redirectTo: "/home"
    });
}]);



rootModule.controller('homeController', ['$scope', 'homeService', 'globalFactory', function($scope, homeService, globalFactory) {
    var currIndex = 0;
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
   
    // get other page details
    homeService.getSlides().then(function(response) {
        $scope.slides = response.data;
    }, function() {
        console.log('Error during slide data fetching!');
    });

    homeService.getProjects().then(function(response) {
        globalFactory.truncateData(response.data, 'shortdescription', 250);
        $scope.projects = response.data;
    }, function() {
        console.log('Error during projects data fetching!');
    });    

    homeService.getThumbnails().then(function(response) {
        globalFactory.truncateData(response.data, 'shortdescription', 120);
        var events = angular.copy(response.data)
        while (events.length) {
            var temparr = [];
            $scope.displayeventgroup.push(events.splice(0, 3));
        }
    }, function() {
        console.log('Error during event data fetching!');
    });

    $scope.open = function (event) {
        globalFactory.modalOpen({
            header: event.eventname,
            description: event.longdescription,
            image: event.image
        });
    }
}]);



rootModule.controller('impactController', ['$scope', 'impactService', 'globalFactory', function($scope, impactService, globalFactory) {
    $scope.bannerUrl;
    $scope.bannertext;

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannerUrl = response.impact.bannerimage;
        $scope.bannertext = response.impact.bannertext;
    });

    impactService.getImpactThumbnails().then(function(response) {
        globalFactory.truncateData(response.data, 'oneliner', 120);
        $scope.impacts = response.data;
    }, function() {
        console.log('Error during event data fetching!');
    });

    $scope.open = function (impact) {
        globalFactory.modalOpen({
            header: impact.name,
            description: impact.longdescription,
            image: impact.image
        });
    }
}]);



rootModule.controller('whatweareController', ['$scope', 'teamService', 'globalFactory', function($scope, teamService, globalFactory) {
    $scope.bannerUrl = 'http://placehold.it/1146x400';
    $scope.bannertext = '';
    $scope.vision = '';
    $scope.mission = '';

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannerUrl = response.whatweare.bannerimage;
        $scope.bannertext = response.whatweare.bannertext;
        $scope.vision = response.whatweare.vision;
        $scope.mission = response.whatweare.mission;    
    });

    teamService.getStaff().then(function(response) {
        $scope.teamdata = response.data;
    }, 
    function() {
        console.log('Error during team data fetching!');
    });
}]);



rootModule.controller('journeyController', ['$scope', 'journeyService', 'globalFactory', function($scope, journeyService, globalFactory) {
    var currIndex = 0;
    $scope.myInterval = 5000;
    $scope.slides = [];
    $scope.crisis = [];
    $scope.conceptnote = [];
    $scope.projects = [];
    $scope.displayeventgroup = [];

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannertext = response.journey.bannertext;
        $scope.bannerUrl = response.journey.bannerimage;
    });

    // get other page details
    journeyService.getTestimonials().then(function(response) {
        $scope.slides = response.data;
    }, function() {
        console.log('Error during slide data fetching!');
    });

    journeyService.getMilestones().then(function(response) {
        $scope.milestones = response.data;
    }, function() {
        console.log('Error during projects data fetching!');
    });

}]);








/*
rootModule.controller('journeyController', ['$scope', 'journeyService', 'globalFactory', function($scope, journeyService, globalFactory) {
    $scope.milestones = [];
    $scope.bannertext = '';

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannertext = response.journey.bannertext;
        $scope.bannerUrl = response.journey.bannerimage;
    });

    journeyService.getMilestone().then(function(response) {
        $scope.milestones = response.data;
    }, function() {
        console.log('Error during team data fetching!');
    })
}]);
*/


rootModule.controller('contactusController', ['$scope', 'contactUsService', 'globalFactory', function($scope, contactUsService, globalFactory) {
    $scope.showaddress = false;

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannerUrl = response.contactus.bannerimage;
    });
    
    contactUsService.getLocations().then(function(response) {
        var locations = response.data;
        $scope.locations = locations;
    }); 
}]);



rootModule.controller('donateController', ['$scope', 'globalFactory', function($scope, globalFactory) {
	// fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannerUrl = response.donate.bannerimage;
        $scope.bannertext = response.donate.bannertext;
        $scope.online = response.donate.donationdetails.online;
        $scope.mobile = response.donate.donationdetails.mobile;
        $scope.note = response.donate.donationdetails.note;
    });
}]);


rootModule.controller('projectController', ['$scope', '$routeParams', 'homeService', 'globalFactory', function($scope, $routeParams, homeService, globalFactory) {
    $scope.bannerUrl = 'http://placehold.it/1146x400';
    $scope.project;

    // temporary variable.
    $scope.projects = [];

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannerUrl = response.project.bannerimage;
    });

    homeService.getProjects().then(function(response) {
        $scope.projects = response.data;

        // temporary logic
        for(var i=0; i < $scope.projects.length; i++) {
            if ($scope.projects[i].id == parseInt($routeParams.projectid, 10)) {
                $scope.project = $scope.projects[i];
                break;
            }
        }
    }, function() {
        console.log('Error during project data fetching!');
    });

}]);



rootModule.controller('galleryController', ['$scope', 'galleryService', 'globalFactory', '$timeout', function($scope, galleryService, globalFactory, $timeout) {
    
    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannertext = response.gallery.bannertext;
        $scope.bannerUrl = response.gallery.bannerimage;
    });
    
    galleryService.getGallery().then(function(response) {
        $scope.sorteddata = globalFactory.sortGalleryData(response.data);
        $scope.categories = Object.keys($scope.sorteddata);

        // Apply galary plugin
        setTimeout(function() {
            for (var i=0; i< $scope.categories.length; i++) {
                var pane = document.getElementById('gallary_' + i);
                lightGallery(pane);
            }
        }, 0);
    }, function() {
        console.log('Error during gallery data fetching!');
    });
}]);


rootModule.service('homeService', ['$http', 'baseUrl', function($http, baseUrl) {
    var cachedevents;
    var cachedDataSlides;
    var cachedDataProjects;

    this.getThumbnails = function() { 
        if (!cachedevents) {
            cachedevents =  $http.get(baseUrl + '/events');
        }
        return cachedevents;
    }

    this.getSlides = function() {

        if (!cachedDataSlides) {
            cachedDataSlides =  $http.get(baseUrl + '/slides');
        }
        return cachedDataSlides;
    }
    
    this.getProjects = function() {
        if (!cachedDataProjects) {
            cachedDataProjects =  $http.get(baseUrl + '/projects');
        }
        return cachedDataProjects;
    }
}]);



rootModule.service('impactService', ['$http', 'baseUrl', function($http, baseUrl) {
    var cachedData;

    this.getImpactThumbnails = function() {
        if (!cachedData) {
            cachedData =  $http.get(baseUrl + '/impacts');
        }
        return cachedData;
    }
}]);



rootModule.service('teamService', ['$http', 'baseUrl', function($http, baseUrl) {
    var cachedData;

    this.getStaff = function() {
        if (!cachedData) {
            cachedData =  $http.get(baseUrl + '/team');
        }
        return cachedData;
    }
}]);
    


rootModule.service('journeyService', ['$http', 'baseUrl', function($http, baseUrl) {
    var cachedDataMilestones;
    var cachedDataSlides;

    // get the event data from backend
    this.getMilestones = function() {
        if (!cachedDataMilestones) {
            cachedDataMilestones = $http.get(baseUrl + '/milestones');
        }
        return cachedDataMilestones;
    };

    this.getTestimonials = function() {
        if (!cachedDataSlides) {
            cachedDataSlides = $http.get(baseUrl + '/testimonials');
        }
        return cachedDataSlides;
    }

}]);


rootModule.service('galleryService', ['$http', 'baseUrl', function($http, baseUrl) {
    var cachedData;
    // get the event data from backend
    this.getGallery = function() {
        if (!cachedData) {
            cachedData = $http.get(baseUrl + '/gallery');
        }
        return cachedData;
    }
}]);
    


rootModule.directive('donateLink', function(){
    return {
        restrict: 'A',
        templateUrl: '/shared/donatelink/donatelinkTemplate.html'
    };
});


rootModule.directive('contactForm', function(){
    return {
        restrict: 'E',
        templateUrl: '/shared/contactform/contactformTemplate.html'
    };
});


rootModule.directive('vayamHeader', function(){
    return {
        restrict: 'A',
        templateUrl: '/shared/header/headerTemplate.html',
        scope: true,
        controller: ['$scope', '$route', function($scope, $route) {
            $scope.$on("$routeChangeSuccess", function(event, next, current) {
                $scope.selected = $route.current.activetab;
            });
        }]
    };
});



rootModule.directive('vayamFooter', function(){
    return {
        restrict: 'A',
        templateUrl: '/shared/footer/footerTemplate.html',
        scope: true,
        controller: ['$scope', 'globalFactory', function($scope, globalFactory) {
            // fetch static data for this page. 
            globalFactory.getStaticData(function(response) {
                $scope.fb = response.socialnetwork.fb;
                // $scope.twitter = response.socialnetwork.twitter;
                $scope.youtube = response.socialnetwork.youtube;
                $scope.wordpress = response.socialnetwork.wordpress;
            });
        }]
    };
});



rootModule.directive('vayamMap', function(){
	return {
		restrict: 'E',
		templateUrl: '/shared/googlemap/locationmap.html',
		replace: true,
		transclude : true,
		scope: true,
		controller: ['$scope', 'contactUsService', function ($scope, contactUsService) {
			contactUsService.getLocations().then(function(response) {
				var locations = response.data;
				$scope.locations = locations;

				var canvas = document.getElementById('map');
				var infoWindow = new google.maps.InfoWindow();
				var mapProp= {
					center: new google.maps.LatLng($scope.locations[0].coordinates.latitude, $scope.locations[0].coordinates.longitude),
					zoom: 10,
				};
								
				var map = new google.maps.Map(canvas, mapProp);
				var position = new google.maps.LatLng(locations[0].coordinates.latitude, locations[0].coordinates.longitude);
				marker = new google.maps.Marker({
					position: position,
					map: map,
					title: locations[0].name,
					animation: google.maps.Animation.BOUNCE
				});
			}, function() {
				console.log('Error during location data fetching!');
			});
		}]
	};
});



rootModule.directive('imageBanner', function(){
    return {
        restrict: 'E',
        templateUrl: '/shared/imagebanner/imageBannerTemplate.html',
        scope: true,
        controller: ['$scope', '$route', function($scope, $route) {
            $scope.activepage = $route.current.activepage;
            $scope.activetab = $route.current.activetab;
            if ($scope.activetab.indexOf( $scope.activepage) === -1) {
                $scope.bradecrume = $scope.activetab + " / " + $scope.activepage;
            }
            else {
                $scope.bradecrume = $scope.activetab;
            }
        }]
    };
});


rootModule.factory('globalFactory', ['$uibModal', '$http', function($uibModal, $http) {

   var staticData = null;
   
   return { 
        modalOpen: function(options) {
            let modalInstance = $uibModal.open({
                animation: true,
                controller: ['$scope', function($scope){
                    $scope.header = options.header;
                    $scope.description = options.description;
                    $scope.image = options.image;
                    $scope.canceltext = options.canceltext ? options.canceltext : 'Cancel';
                    $scope.cancel = function() {
                        modalInstance.close();
                    };
                }],
                size: 'lg',
                backdrop: 'static',
                templateUrl: options.templateurl ? options.templateUrl : 'shared/globalfactory/templates/ModalView.html'
            });
        },
        
        // if description is too long this function will take care of truncation.
        truncateData: function(data, trunckey, charlen) {
            for (var i=0; i< data.length; i++) {
                if (data[i][trunckey].length > charlen) {
                    data[i][trunckey] = data[i][trunckey].slice(0, charlen) + ' ...';
                }
            }
        },

        // return static data for application.
        getStaticData: function(callback) {
            if (!staticData) {
                $http.get('staticData.json').then(function(response) {
                    staticData = response.data;
                    callback(staticData);
                }, function() {
                    console.log('Error during static data fetching!');
                });
            }
            else {
                callback(staticData);
            }
        },

        // return static data for application.
        sortGalleryData: function(data) {
            var sorteddata = {};
            for (var i=0; i< data.length; i++) {
                if (sorteddata[data[i]['category']]) {
                    sorteddata[data[i]['category']].push(data[i]);
                }
                else {
                    sorteddata[data[i]['category']] = [];
                }
            }

            return sorteddata;
        }
   };
}]);


rootModule.service('contactUsService', ['$http', 'baseUrl', function($http, baseUrl) {
    var cachedData;

    this.getLocations = function() {
        if (!cachedData) {
            cachedData =  $http.get(baseUrl + '/locations');
        }
        return cachedData;
    }
}]);
