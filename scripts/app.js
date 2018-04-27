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



rootModule.controller('homeController', ['$scope', 'homeService', 'globalFactory', function($scope, homeService, globalFactory) {
    var currIndex = 0;
    $scope.myInterval = 4000;
    $scope.slides = [];
    $scope.crisis = [];
    $scope.conceptnote = [];
    $scope.projects = [];
    $scope.displayeventgroup = [];

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
        console.log($scope.projects);
    }, function() {
        console.log('Error during projects data fetching!');
    });    

    homeService.getThumbnails().then(function(response) {
        globalFactory.truncateData(response.data, 'shortdescription', 120);
        var events = response.data;
        while (events.length) {
            var temparr = [];
            temparr = events.splice(0, 3);
            $scope.displayeventgroup.push(temparr);
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



rootModule.controller('teamController', ['$scope', 'teamService', 'globalFactory', function($scope, teamService, globalFactory) {    
    $scope.teamdata = [];
    $scope.bannerUrl = 'http://placehold.it/1146x400';
    $scope.bannertext = '';

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannertext = response.teambannertext;  
    });    
    
    teamService.getStaff().then(function(response) {
        console.log(response.data);
        $scope.teamdata = response.data;
        }, function() {
            console.log('Error during team data fetching!');
    });
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
        console.log(response.data);
        $scope.teamdata = response.data;
        }, function() {
            console.log('Error during team data fetching!');
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
    journeyService.getSlides().then(function(response) {
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
        console.log(response);
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
    });
}]);


rootModule.controller('newsController', ['$scope', '$routeParams', 'newsService', '$timeout', 'Pagination', function($scope, $routeParams, newsService, $timeout, Pagination) {
    $scope.bannerUrl = 'http://placehold.it/1146x400';
    newsService.getNews().then(function(response) {
        $scope.news = response.data;
        $scope.pagination = Pagination.getNew(5);
        $scope.pagination.numPages = Math.ceil($scope.news.length/$scope.pagination.perPage);
        $timeout(function() {
            $(".news-item-list").bootstrapNews({
                newsPerPage: 11,
                autoplay: true,
                pauseOnHover:true,
                direction: 'up',
                newsTickerInterval: 4000,
                onToDo: function () {
                    //console.log(this);
                }
            });
        }, 100);

        if ($routeParams.newsid) {
            $scope.selectedNews = $scope.news.find(function(item) {
               return item.id == parseInt($routeParams.newsid, 10);
            });
        }
    }, function() {
        console.log('Error during event data fetching!');
    });

}]);



rootModule.controller('projectController', ['$scope', '$routeParams', 'projectService', 'globalFactory', function($scope, $routeParams, projectService, globalFactory) {
    $scope.bannerUrl = 'http://placehold.it/1146x400';
    $scope.project;

    // temporary variable.
    $scope.projects = [];

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannerUrl = response.project.bannerimage;
    });

    projectService.getProjects().then(function(response) {
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
    


rootModule.service('journeyService', ['$http', 'baseUrl', function($http, baseUrl) {

    // get the event data from backend
    this.getMilestones = function() {
        return $http.get(baseUrl + '/milestones');
    };

    this.getSlides = function() {
        return $http.get(baseUrl + '/slides');
    }

}]);

/*
rootModule.service('journeyService', ['$http', function($http) {
    
    // get the milestone data from backend
    this.getMilestone = function() {
        return $http.get('http://localhost:3000/milestone');
    };
}]);
*/


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

    // get the event data from backend
    this.getLocations = function() {
        return $http.get(baseUrl + '/locations');
    };

}]);
