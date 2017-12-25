rootModule.controller('newsController', ['$scope', 'newsService', '$timeout', function($scope, newsService, $timeout) {
    newsService.getNews().then(function(response) {
        $scope.news = response.data;
    }, function() {
        console.log('Error during event data fetching!');
    });

    $timeout(function() {
        var i = 0;
        var len = $(".news-list > div").length;
        $(".news-list > div").each(function () {
            //$(this).css("top", i);
            //i += 80;
            animatescroll($(this), len);
        });
    })


    var animatescroll = function($elem, len) {
        var top = parseInt($elem.css("top"));
        var temp = -1 * parseInt(len) * ($('.news-list > div').height() + 30);
        console.log(top);
        console.log(temp);
        if(top < temp) {
            top = $('.news-list').height();
            $elem.css("top", top);
        }

        $elem.animate({ top: (parseInt(top)-60) }, 1000, function () {
            animatescroll(jQuery(this), len)
        });
    };
}]);
