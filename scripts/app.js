/* 
This file should only hold global declarations and global setting
related to app.
*/

var rootModule = angular.module('rootModule', [
    'ngRoute',
    'ui.bootstrap'
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
        activetab: 'home'
    })
    .when("/impact", {
        templateUrl: "components/impact/impactView.html",
        controller: "impactController",
        activetab: 'impact'
    })    
    .when("/whatweare", {
        templateUrl: "components/aboutus/whatweare/whatweareView.html",
        controller: "whatweareController",
        activetab: 'aboutus'
    })
    .when("/journey", {
        templateUrl: "components/aboutus/journey/journeyView.html",
        controller: "journeyController",
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
    .when("/project/:projectid", {
        templateUrl: "components/project/projectView.html",
        controller: "projectController",
        activetab: 'project'
    })
<<<<<<< Updated upstream
    .when("/news", {
        templateUrl: "components/news/newsView.html",
        controller: "newsController",
        activetab: 'news'
=======
    .when("/gallery", {
        templateUrl: "components/gallery/galleryView.html",
        controller: "galleryController",
        activetab: 'gallery'
>>>>>>> Stashed changes
    })
    .otherwise({
        redirectTo: "/home"
    });
}]);



rootModule.controller('homeController', ['$scope', 'homeService', 'globalFactory', function($scope, homeService, globalFactory) {
    var currIndex = 0;
    $scope.myInterval = 1000;
    $scope.slides = [];
    $scope.crisis = [];
    $scope.conceptnote = [];
    $scope.projects = [];

    // fetch static data for this page. 
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
        $scope.events = response.data;
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
    $scope.bannerUrl = 'http://placehold.it/1146x400';
    $scope.bannertext;

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannertext = response.impactbannertext;
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



rootModule.controller('teamController', ['$scope', 'teamService', 'globalFactory', function($scope, teamService, globalFactory) {    
    $scope.teamgroup = {};
    $scope.bannerUrl = 'http://placehold.it/1146x400';
    $scope.bannertext = '';

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannertext = response.teambannertext;  
    });    
    
    teamService.getStaff().then(function(response) {
            var teamdata = response.data;
            var key = 0;
            while(teamdata.length > 0) {
                ++key;
                $scope.teamgroup[key.toString()] = teamdata.splice(0, 4);
            }
        }, function() {
            console.log('Error during team data fetching!');
    });
}]);



rootModule.controller('whatweareController', ['$scope', 'globalFactory', function($scope, globalFactory) {
    $scope.bannerUrl = 'http://placehold.it/1146x400';
    $scope.bannertext = '';
    $scope.vision = '';
    $scope.mission = '';

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannertext = response.whatweare.bannertext;
        $scope.vision = response.whatweare.vision;
        $scope.mission = response.whatweare.mission;    
    });

}]);



rootModule.controller('testimonialsController', ['$scope', 'testimonialsService', 'globalFactory', function($scope, testimonials, globalFactory) {
    $scope.testimonials;
    $scope.bannerUrl = 'http://placehold.it/1146x400';
    $scope.bannertext = '';

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannertext = response.testimonialsbannertext;
    });    

    testimonials.getTestimonials().then(function(response) {
        $scope.testimonials = response.data;
        }, function() {
            console.log('Error during team data fetching!');
        })
}]);



rootModule.controller('journeyController', ['$scope', 'journeyService', 'globalFactory', function($scope, journeyService, globalFactory) {
    $scope.milestones = [];
    $scope.bannerUrl = 'http://placehold.it/1146x400';
    $scope.bannertext = '';

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannertext = response.journeybannertext;
    });

    journeyService.getMilestone().then(function(response) {
        $scope.milestones = response.data;
    }, function() {
        console.log('Error during team data fetching!');
    })
}]);



rootModule.controller('contactusController', ['$scope', function($scope) {
    $scope.bannerUrl = "http://placehold.it/1146x400";
}]);



rootModule.controller('donateController', ['$scope', function($scope) {
}]);



rootModule.controller('newsController', ['$scope', 'newsService', '$timeout', function($scope, newsService, $timeout) {
    newsService.getNews().then(function(response) {
        $scope.news = response.data;
    }, function() {
        console.log('Error during event data fetching!');
    });

    $timeout(function() {
        var i = 0;
        var len = $(".news-list > div").length;
        $(".news-list > div").each(function () {
            //$(this).css("top", i);
            //i += 80;
            animatescroll($(this), len);
        });
    })


    var animatescroll = function($elem, len) {
        var top = parseInt($elem.css("top"));
        var temp = -1 * parseInt(len) * ($('.news-list > div').height() + 30);
        console.log(top);
        console.log(temp);
        if(top < temp) {
            top = $('.news-list').height();
            $elem.css("top", top);
        }

        $elem.animate({ top: (parseInt(top)-60) }, 1000, function () {
            animatescroll(jQuery(this), len)
        });
    };
}]);



rootModule.controller('projectController', ['$scope', '$routeParams', 'projectService', function($scope, $routeParams, projectService) {
    $scope.bannerUrl = 'http://placehold.it/1146x400';
    $scope.project;

    // temporary variable.
    $scope.projects = [];


    projectService.getProjects().then(function(response) {
        $scope.projects = response.data;
        
        // temporary logic
        for(var i=0; i < $scope.projects.length; i++) {
            if ($scope.projects[i].id == parseInt($routeParams.projectid, 10)) {
                $scope.project =  $scope.projects[i];
                break;
            }
        }
    }, function() {
        console.log('Error during project data fetching!');
    });

}]);



rootModule.controller('galleryController', ['$scope', 'galleryService', function($scope, galleryService) {
    $scope.gallery = [];
    galleryService.getGallery().then(function(response) {
        console.log(response);
        $scope.gallery = response.data;
    }, function() {
        console.log('Error during gallery data fetching!');
    });
}]);



rootModule.service('homeService', ['$http', 'baseUrl', function($http, baseUrl) {

    // get the event data from backend
    this.getThumbnails = function() {
        return $http.get(baseUrl + '/events');
    };

    this.getSlides = function() {
        return $http.get(baseUrl + '/slides');
    }
    
    this.getProjects = function() {
        return $http.get(baseUrl + '/projects');
    }
}]);



rootModule.service('impactService', ['$http', 'baseUrl', function($http, baseUrl) {

    // get the impact data from backend
    this.getImpactThumbnails = function() {
        return $http.get(baseUrl + '/impacts');
    };
}]);



/**
 * Created by awaleg on 24/12/17.
 */
rootModule.service('newsService', ['$http', 'baseUrl', function($http, baseUrl) {

    // get the event data from backend
    this.getNews = function() {
        return $http.get(baseUrl + '/news');
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
    


rootModule.service('journeyService', ['$http', function($http) {
    
    // get the milestone data from backend
    this.getMilestone = function() {
        return $http.get('http://localhost:3000/milestone');
    };
}]);
    


rootModule.service('projectService', ['$http', 'baseUrl', function($http, baseUrl) {
    
    // This will get swap with just getProject when actual API
    // is ready.
    this.getProjects = function() {
        return $http.get(baseUrl + '/projects');
    }
}]);



rootModule.service('galleryService', ['$http', 'baseUrl', function($http, baseUrl) {

    // get the event data from backend
    this.getGallery = function() {
        return $http.get(baseUrl + '/gallery');
    }
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
		templateUrl: 'components/locationmap/locationmap.html',
		replace: true,
		transclude : true,
		scope: true,
		controller: ['$scope', 'contactUsService', function ($scope, contactUsService) {
			contactUsService.getLocations().then(function(response) {
				var locations = response.data;
				$scope.locations = locations;

				var bounds = new google.maps.LatLngBounds();
				var canvas = document.getElementById('map');
				var map = new google.maps.Map(canvas);
				var infoWindow = new google.maps.InfoWindow(), marker, i, markers = [];
				for ( i = 0; i < locations.length; i++) {
					var position = new google.maps.LatLng(locations[i].coordinates.latitude, locations[i].coordinates.longitude);
					bounds.extend(position);
					marker = new google.maps.Marker({
						position: position,
						map: map,
						title: locations[i][0],
						animation: google.maps.Animation.BOUNCE
					});

					// Allow each marker to have an info window
					google.maps.event.addListener(marker, 'click', (function(marker, i) {
						return function() {
							//infoWindow.setContent(infoWindowContent[i][0]);
							infoWindow.setContent("<div><h4>" + locations[i].name + "</h4><address>" + locations[i].address + locations[i].pincode + "</address></div>");
							infoWindow.open(map, marker);
						}
					})(marker, i));

					// Automatically center the map fitting all markers on the screen
					map.fitBounds(bounds);

					// Push the marker to the 'markers' array
					markers.push(marker);
				};

				$scope.openMapInfoWindow = function(markerindex) {
					markers = markers || [];
					google.maps.event.trigger(markers[markerindex], 'click');
				}

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
        scope: true
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
        truncateData(data, trunckey, charlen) {
            for (var i=0; i< data.length; i++) {
                if (data[i][trunckey].length > charlen) {
                    data[i][trunckey] = data[i][trunckey].slice(0, charlen) + ' ...';
                }
            }
        },

        // return static data for application.
        getStaticData(callback) {
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
        }
   };
}]);


/**
 * Created by awaleg on 27/11/17.
 */
rootModule.service('contactUsService', ['$http', 'baseUrl', function($http, baseUrl) {

    // get the event data from backend
    this.getLocations = function() {
        return $http.get(baseUrl + '/locations');
    };

}]);
