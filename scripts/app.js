/* 
This file should only hold global declarations and global setting
related to app.
*/

var rootModule = angular.module('rootModule', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'simplePagination',
    'datatables',
    'contentful'
]);

var appConfig = {
    'useContentFul': true,
    'apiURL': 'http://localhost:3000'
};

// constant for base URL. Change this on production server
rootModule.constant('baseUrl', 'http://localhost:3000');
rootModule.constant('appConfig', appConfig);

if (appConfig.useContentFul) {
    rootModule.config(function (contentfulProvider) {
        contentfulProvider.setOptions({
            space: '60in3qh11j2f',
            accessToken: '73d398d77bebd3ffc71f78863345d842222fb5f7621088969da02d5b186011da'
        });
    });
}





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
    .when("/impact/:impactid", {
        templateUrl: "components/project/projectView.html",
        controller: "impactController",
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



rootModule.controller('impactController', ['$scope', '$routeParams', 'impactService', 'globalFactory', function($scope, $routeParams, impactService, globalFactory) {
    $scope.bannerUrl;
    $scope.bannertext;
    $scope.project;

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannerUrl = response.impact.bannerimage;
        $scope.bannertext = response.impact.bannertext;
    });

    impactService.getImpactThumbnails().then(function(response) {
        var impacts = globalFactory.resolveLinksIfContentFul(response.data.items);
        impacts = globalFactory.resolveParasIfContentFul(impacts, 'longDescription');
        globalFactory.truncateData(impacts, 'oneLine', 120);
        $scope.impacts = impacts;

        if ($routeParams.impactid) {
            for(var i=0; i < $scope.impacts.length; i++) {
                if ($scope.impacts[i].id == $routeParams.impactid) {
                    $scope.impact = $scope.impacts[i];
                    break;
                }
            }
        }
    }, function() {
        console.log('Error during event data fetching!');
    });
}]);



rootModule.controller('whatweareController', ['$scope', 'teamService', 'globalFactory', function($scope, teamService, globalFactory) {
    $scope.bannerUrl = 'http://placehold.it/1146x400';
    $scope.bannertext = '';
    $scope.vision = '';
    $scope.mission = '';

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.title = response.whatweare.title;
        $scope.bannerUrl = response.whatweare.bannerimage;
        $scope.bannertext = response.whatweare.bannertext;
        $scope.vision = response.whatweare.vision;
        $scope.mission = response.whatweare.mission;    
    });

    teamService.getStaff().then(function(response) {
        $scope.teamdata = globalFactory.resolveLinksIfContentFul(response.data.items);
    }, 
    function() {
        console.log('Error during team data fetching!');
    });
}]);



rootModule.controller('journeyController',[
    '$scope',
    'journeyService',
    'globalFactory',
    function($scope, journeyService, globalFactory) {
        var isContentFul = appConfig.useContentFul;
        $scope.myInterval = 5000;
        $scope.slides = [];
        $scope.crisis = [];
        $scope.conceptnote = [];
        $scope.projects = [];
        $scope.displayeventgroup = [];

        // fetch static data for this page. 
        globalFactory.getStaticData(function(response) {
            $scope.title = response.journey.title;
            $scope.bannertext = response.journey.bannertext;
            $scope.bannerUrl = response.journey.bannerimage;
        });

        // get other page details
        journeyService.getTestimonials().then(function(response) {
            $scope.slides = globalFactory.resolveLinksIfContentFul(response.data.items);
            console.log($scope.slides);
        }, function() {
            console.log('Error during slide data fetching!');
        });

        journeyService.getMilestones().then(function(response) {
            $scope.milestones = globalFactory.resolveLinksIfContentFul(response.data.items);
        }, function() {
            console.log('Error during projects data fetching!');
        });
    }
]);


rootModule.controller('contactusController', ['$scope', 'contactUsService', 'globalFactory', function($scope, contactUsService, globalFactory) {
    $scope.showaddress = false;

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannerUrl = response.contactus.bannerimage;
        $scope.title = response.contactus.title;
        $scope.bannertext = response.contactus.bannertext;
    });
    
    contactUsService.getLocations().then(function(response) {
        $scope.locations = response.data.items;
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


rootModule.controller('projectController', [
    '$scope',
    '$routeParams',
    'homeService',
    'globalFactory',
    'projectDetailsService',
     function($scope, $routeParams, homeService, globalFactory, projectDetailsService) {
    $scope.bannerUrl = 'http://placehold.it/1146x400';
    $scope.project;

    // temporary variable.
    $scope.projects = [];

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannerUrl = response.project.bannerimage;
    });

    homeService.getProjects().then(function(response) {
        $scope.projects = globalFactory.resolveLinksIfContentFul(response.data.items, 'icon');
        // temporary logic
        for(var i=0; i < $scope.projects.length; i++) {
            if ($scope.projects[i].id == $routeParams.projectid) {
                $scope.project = projectDetailsService.resolvedChildProject($scope.projects[i]);
                console.log($scope.project);
                break;
            }
        }
    }, function() {
        console.log('Error during project data fetching!');
    });

}]);



rootModule.controller('downloadController', ['$scope', 'downloadService', 'globalFactory', function($scope, downloadService, globalFactory) {
        $scope.gridData = [];
        // fetch static data for this page. 
        globalFactory.getStaticData(function(response) {
            $scope.bannerUrl = response.download.bannerimage;
            $scope.bannertext = response.download.bannertext;
        });

        downloadService.getDownloadData().then(function(response) {
            $scope.gridData = globalFactory.resolveLinksIfContentFul(response.data.items, 'downloadFile');
        }, function() {
            console.log('Error during downloads data fetching!');
        });
}]);



rootModule.controller('galleryController', ['$scope', 'galleryService', 'globalFactory', '$timeout', function($scope, galleryService, globalFactory, $timeout) {
    
    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannertext = response.gallery.bannertext;
        $scope.bannerUrl = response.gallery.bannerimage;
    });
    
    galleryService.getGallery().then(function(response) {
       var resolvedData = globalFactory.resolveLinksIfContentFul(response.data.items);
        $scope.sorteddata = globalFactory.sortGalleryData(resolvedData);
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


rootModule.service('homeService', [
    '$http',
    'globalFactory',
    function($http, globalFactory) {
        var cachedevents;
        var cachedDataSlides;
        var cachedDataProjects;

        this.getThumbnails = function() { 
            if (!cachedevents) {
                cachedevents = globalFactory.getStandardGetRequest('events');
            }
            return cachedevents;
        }


        this.getSlides = function() {
            if (!cachedDataSlides) {
                cachedDataSlides = globalFactory.getStandardGetRequest('slides');
            }
            return cachedDataSlides;
        }
        
        this.getProjects = function() {
            if (!cachedDataProjects) {
                cachedDataProjects =  globalFactory.getStandardGetRequest('projects', '&fields.childProjects[exists]=true');
            }
            return cachedDataProjects;
        }
    }
]);



rootModule.service('impactService', ['globalFactory', function(globalFactory) {
    var cachedData;

    this.getImpactThumbnails = function() {
        if (!cachedData) {
            cachedData =  globalFactory.getStandardGetRequest('impacts');
        }
        return cachedData;
    }
}]);



rootModule.service('teamService', ['globalFactory', function(globalFactory) {
    var cachedData;

    this.getStaff = function() {
        if (!cachedData) {
            cachedData =  globalFactory.getStandardGetRequest('team');
        }
        return cachedData;
    }
}]);
    


rootModule.service('journeyService', [
    'globalFactory',
    function(globalFactory) {
    var cachedDataMilestones;
    var cachedDataSlides;

    // get the event data from backend
    this.getMilestones = function() {
        if (!cachedDataMilestones) {
            cachedDataMilestones = globalFactory.getStandardGetRequest('milestones');
        }
        return cachedDataMilestones;
    };

    this.getTestimonials = function() {
        if (!cachedDataSlides) {
            cachedDataSlides = globalFactory.getStandardGetRequest('testimonials');
        }
        return cachedDataSlides;
    }
}]);


rootModule.service('galleryService', ['globalFactory', function(globalFactory) {
    var cachedData;
    // get the event data from backend
    this.getGallery = function() {
        if (!cachedData) {
            cachedData = globalFactory.getStandardGetRequest('gallery');
        }
        return cachedData;
    }
}]);
    


rootModule.service('downloadService', ['globalFactory', function(globalFactory) {
    var cachedData;

    this.getDownloadData = function() {
        if (!cachedData) {
            cachedData =  globalFactory.getStandardGetRequest('downloads');
        }
        return cachedData;
    }
}]);



rootModule.service('projectDetailsService', [
    'globalFactory',
    function(globalFactory) {
        this.resolvedChildProject = function(parentProject) { 
            var parentProjectData = JSON.parse(JSON.stringify(parentProject));
            var childData = parentProjectData.childProjects;
            childData = globalFactory.resolveLinksIfContentFul(childData, 'displayImage');
            childData = globalFactory.resolveParasIfContentFul(childData, 'shortDescription');
            parentProjectData.childProjects = childData;
            return parentProjectData;
        }
    }
]);



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
                $scope.twitter = response.socialnetwork.twitter;
                $scope.youtube = response.socialnetwork.youtube;
                $scope.wordpress = response.socialnetwork.wordpress;

                $scope.footernote =  response.footernote;
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
				var locations = response.data.items[0].fields;

				var canvas = document.getElementById('map');
				var infoWindow = new google.maps.InfoWindow();
				var mapProp= {
					center: new google.maps.LatLng(locations.coordinates.lat, locations.coordinates.lon),
					zoom: 10,
				};
								
				var map = new google.maps.Map(canvas, mapProp);
				var position = new google.maps.LatLng(locations.coordinates.lat, locations.coordinates.lon);
				marker = new google.maps.Marker({
					position: position,
					map: map,
					title: locations.name,
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
        scope: false,
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


rootModule.factory('globalFactory', [
    '$http',
    'appConfig',
    'contentful',
    'contentfulFactory',
    function($http, appConfig, contentful, contentfulFactory) {
        var staticData = null;
        var isContentFul = appConfig.useContentFul;
        
        return { 
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
                        var currentElement = data[i];
                        var currentCategory = currentElement['category'];
                        if (!sorteddata[currentCategory]) {
                            sorteddata[currentCategory] = [];
                            sorteddata[currentCategory].push(currentElement);
                        } else {
                            sorteddata[currentCategory].push(currentElement);
                        }
                    }

                   return sorteddata;
                },

                // Returns standard get request with fall back
                // to optional backend. Default bakend for now
                // is contentful.
                getStandardGetRequest: function(endpoint, additionalquery) {
                    var request;
                    if (isContentFul) {
                        var apiQuery =  'content_type='+ endpoint;
                        apiQuery += additionalquery ? additionalquery : '';
                        request = contentful.entries(apiQuery);
                    } else {
                        request =  $http.get(appConfig.apiURL + '/' + endpoint);
                    }
                    return request;
                },

                // Returns sorted list of objects by date.
                sortObjectsByDates: function(listOfObjects, datePropertyName) {
                    var tempObjectList = [...listOfObjects];
                    tempObjectList.sort(function(a, b) {
                        return Date.parse(b[datePropertyName]) - Date.parse(a[datePropertyName]);
                    });
                    return tempObjectList;
                },

                // Resolved images if we are using contentful
                resolveLinksIfContentFul: function(data, type) {
                   return isContentFul 
                        ? contentfulFactory.getLinkedUrls(data, type) 
                        : data
                    ;
                },

                // Seperate outs paras in elements of an array
                resolveParasIfContentFul: function(data, fieldName) {
                    return isContentFul 
                        ? contentfulFactory.getParagraphsListFromText(data, fieldName) 
                        : data
                    ;
                }
        };
    }
]);


rootModule.factory('contentfulFactory', [function() {
    return { 
        getLinkedUrls: function(data, type) {
            var dataToUse = JSON.parse(JSON.stringify(data));
            var linkedType = type ? type : 'image';
            var resultSet = [];
            var dataLength = dataToUse ? dataToUse.length : 0;
            for (var k = 0; k < dataLength; k++) {
                var currentField =dataToUse[k].fields;
                var linkUrl;
                if (dataToUse[k].fields[linkedType]) {
                    linkUrl = dataToUse[k].fields[linkedType].fields.file.url;
                    currentField[linkedType] = linkUrl;
                }
                currentField['id'] = dataToUse[k].sys.id;;
                resultSet.push(currentField);
            }
            
            return resultSet.length ? resultSet : dataToUse;
        },

        getParagraphsListFromText: function(data, fieldName) {
            var dataToUse = JSON.parse(JSON.stringify(data));
            console.log(dataToUse);
            var dataLength = dataToUse.length;
            for (var k = 0; k < dataLength; k++) {
                // Ensure to have single \n for new line
                var text = dataToUse[k][fieldName];
                var paraList = text.replace(/\n+/g, '\n').split('\n');
                dataToUse[k][fieldName] = paraList;
            }

            return dataToUse;
        }
    };
 }]);


rootModule.factory('modalFactory', [
    '$uibModal',
    function($uibModal) {
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
                        templateUrl: options.templateurl ? options.templateUrl : 'shared/templates/ModalView.html'
                    });
                },
        };
    }
]);


rootModule.service('contactUsService', ['globalFactory', function(globalFactory) {
    var cachedData;

    this.getLocations = function() {
        if (!cachedData) {
            cachedData = globalFactory.getStandardGetRequest('location');
        }
        return cachedData;
    }
}]);
