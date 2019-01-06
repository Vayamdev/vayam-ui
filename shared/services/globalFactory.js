rootModule.factory('globalFactory', [
    '$http',
    'appConfig',
    'contentful',
    'contentfulFactory',
    function ($http, appConfig, contentful, contentfulFactory) {
        var staticData = null;
        var isContentFul = appConfig.useContentFul;

        return {
            // if description is too long this function will take care of truncation.
            truncateData: function (data, trunckey, charlen) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i][trunckey].length > charlen) {
                        data[i][trunckey] = data[i][trunckey].slice(0, charlen) + ' ...';
                    }
                }
            },

            // return static data for application.
            sortGalleryData: function (data) {
                var sorteddata = {};
                for (var i = 0; i < data.length; i++) {
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

            // return static data for application.
            getStaticData: function (callback) {
                if (!staticData) {
                    if (isContentFul) {
                        var apiQuery = 'content_type=' + 'page';
                        request = contentful.entries(apiQuery).then(function (response) {
                            staticData = response.data.items;
                            callback(staticData);
                        });
                    } else {
                        $http.get('staticData.json').then(function (response) {
                            staticData = response.data;
                            callback(staticData);
                        }, function () {
                            console.log('Error during static data fetching!');
                        });
                    }
                }
                else {
                    callback(staticData);
                }
            },

            // Returns standard get request with fall back
            // to optional backend. Default bakend for now
            // is contentful.
            getStandardGetRequest: function (endpoint, additionalquery) {
                var request;
                if (isContentFul) {
                    var apiQuery = 'content_type=' + endpoint;
                    apiQuery += additionalquery ? additionalquery : '';
                    request = contentful.entries(apiQuery);
                } else {
                    request = $http.get(appConfig.apiURL + '/' + endpoint);
                }
                return request;
            },

            // Returns sorted list of objects by date. Latest first
            sortObjectsByDates: function (listOfObjects, datePropertyName) {
                var tempObjectList = [...listOfObjects];
                tempObjectList.sort(function (a, b) {
                    return Date.parse(b[datePropertyName]) - Date.parse(a[datePropertyName]);
                });
                return tempObjectList;
            },

            // Returns sorted list of objects by value (number).
            sortObjectsByValues: function (listOfObjects, propertyName, sorting) {
                var tempObjectList = [...listOfObjects];
                tempObjectList.sort(function (a, b) {
                    return (sorting === 'asc') ? a[propertyName] - b[propertyName] : b[propertyName] - a[propertyName];
                });
                return tempObjectList;
            },

            // Resolved images if we are using contentful
            resolveLinksIfContentFul: function (data, type) {
                return isContentFul
                    ? contentfulFactory.getLinkedUrls(data, type)
                    : data
                    ;
            },

            // Seperate outs paras in elements of an array
            resolveParasIfContentFul: function (data, fieldName) {
                return isContentFul
                    ? contentfulFactory.getParagraphsListFromText(data, fieldName)
                    : data
                    ;
            }
        };
    }
]);