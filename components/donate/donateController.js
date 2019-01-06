rootModule.controller('donateController', ['$scope', 'globalFactory', function($scope, globalFactory) {
	// fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        var data;
        data = globalFactory.resolveLinksIfContentFul(response).filter(data => data.pageName === 'donate')[0];
        data = globalFactory.resolveParasIfContentFul(data, 'text');
        console.log(data);
        $scope.bannerUrl = data.image;
        $scope.bannertext = data.text;
        $scope.online = data.meta.online;
        $scope.mobile = data.meta.mobile;
        $scope.note = data.meta.note;
    });
}]);