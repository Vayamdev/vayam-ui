rootModule.controller('galleryController', ['$scope', 'galleryService', '$timeout', function($scope, galleryService, $timeout) {
     $scope.gallery = [];
    galleryService.getGallery().then(function(response) {
        console.log(response);
        $scope.gallery = response.data;
    }, function() {
        console.log('Error during gallery data fetching!');
    });

    $timeout(function() {
        $('.thumbnail').click(function(){
            $('.modal-body').empty();
          var title = $(this).parent('a').attr("title");
          $('.modal-title').html(title);
          $($(this).parents('div').html()).appendTo('.modal-body');
          $('#myModal').modal({show:true});
      });
    });
}]);
