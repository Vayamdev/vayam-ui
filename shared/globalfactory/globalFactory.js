rootModule.factory('globalFactory', ['$uibModal', '$http', function($uibModal, $http) {

   var staticData = null;
   
   return { 
        modalOpen: function(options) {
            let modalInstance = $uibModal.open({
                animation: true,
                controller: ['$scope', function($scope){
                    $scope.header = options.header;
                    $scope.description = options.description;
                    $scope.image = options.image;
                    $scope.canceltext = options.canceltext ? options.canceltext : 'Cancel';
                    $scope.cancel = function() {
                        modalInstance.close();
                    };
                }],
                size: 'lg',
                backdrop: 'static',
                templateUrl: options.templateurl ? options.templateUrl : 'shared/globalfactory/templates/ModalView.html'
            });
        },
        
        // if description is too long this function will take care of truncation.
        truncateData: function(data, trunckey, charlen) {
            for (var i=0; i< data.length; i++) {
                if (data[i][trunckey].length > charlen) {
                    data[i][trunckey] = data[i][trunckey].slice(0, charlen) + ' ...';
                }
            }
        },

        // return static data for application.
        getStaticData: function(callback) {
            if (!staticData) {
                $http.get('staticData.json').then(function(response) {
                    staticData = response.data;
                    callback(staticData);
                }, function() {
                    console.log('Error during static data fetching!');
                });
            }
            else {
                callback(staticData);
            }
        },

        // return static data for application.
        sortGalleryData: function(data) {
            var sorteddata = {};
            for (var i=0; i< data.length; i++) {
                if (sorteddata[data[i]['category']]) {
                    sorteddata[data[i]['category']].push(data[i]);
                }
                else {
                    sorteddata[data[i]['category']] = [];
                }
            }

            return sorteddata;
        }
   };
}]);