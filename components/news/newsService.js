/**
 * Created by awaleg on 24/12/17.
 */
rootModule.service('newsService', ['$http', 'baseUrl', function($http, baseUrl) {

    // get the event data from backend
    this.getNews = function() {
        return $http.get(baseUrl + '/news');
    };

}]);