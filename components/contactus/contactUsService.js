/**
 * Created by awaleg on 27/11/17.
 */
rootModule.service('contactUsService', ['$http', 'baseUrl', function($http, baseUrl) {

    // get the event data from backend
    this.getLocations = function() {
        return $http.get(baseUrl + '/locations');
    };

}]);
