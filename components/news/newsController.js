rootModule.controller('newsController', ['$scope', 'newsService', '$timeout', 'Pagination', function($scope, newsService, $timeout, Pagination) {
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
    }, function() {
        console.log('Error during event data fetching!');
    });

}]);
