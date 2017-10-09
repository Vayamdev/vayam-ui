home.service('homeService', ['$http', function($http) {

    // get the event data from backend 
    this.getThreeEvents = function(onsuccess) {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/events'
        }).then(function(response){
            onsuccess(response.data);
        }, function(error){
            console.log('Error during data fetching!');
        });
    };
}]);
