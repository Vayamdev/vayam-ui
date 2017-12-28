rootModule.controller('newsController', ['$scope', 'newsService', '$timeout', 'Pagination', function($scope, newsService, $timeout, Pagination) {
    $scope.pagination = Pagination.getNew(2);
    $scope.pagination.numPages = 3;
    newsService.getNews().then(function(response) {
        $scope.news = response.data;
    }, function() {
        console.log('Error during event data fetching!');
    });

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
    });

}]);
