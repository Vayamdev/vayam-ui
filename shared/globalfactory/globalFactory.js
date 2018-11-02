rootModule.factory('globalFactory', [
    '$uibModal',
    '$http',
    'appConfig',
    'contentful',
    'contentfulFactory',
    function($uibModal, $http, appConfig, contentful, contentfulFactory) {
        var staticData = null;
        var isContentFul = appConfig.useContentFul;
        
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
                        var currentElement = data[i];
                        var currentCategory = currentElement['category'];
                        if (!sorteddata[currentCategory]) {
                            sorteddata[currentCategory] = [];
                            sorteddata[currentCategory].push(currentElement);
                        } else {
                            sorteddata[currentCategory].push(currentElement);
                        }
                    }

                    console.log(sorteddata);
                    return sorteddata;
                },

                // Returns standard get request with fall back
                // to optional backend. Default bakend for now
                // is contentful.
                getStandardGetRequest: function(endpoint) {
                    var request;
                    if (isContentFul) {
                        request = contentful.entries('content_type=' + endpoint);
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
                resolvedImageIfContentFul: function(data, type) {
                   return isContentFul 
                        ? contentfulFactory.getLinkedUrls(data, type) 
                        : data
                    ;
                } 
        };
    }
]);