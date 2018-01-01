rootModule.controller('newsController', ['$scope', '$routeParams', 'newsService', '$timeout', 'Pagination', function($scope, $routeParams, newsService, $timeout, Pagination) {
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
            console.log('Hello');
            $scope.bannerUrl = 'http://placehold.it/1146x400';
            $scope.selectedNews = $scope.news.find(function(item) {
               return item.id == parseInt($routeParams.newsid, 10);
            });
        }
    }, function() {
        console.log('Error during event data fetching!');
    });

}]);
