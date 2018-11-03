rootModule.factory('modalFactory', [
    '$uibModal',
    function($uibModal) {
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
                        templateUrl: options.templateurl ? options.templateUrl : 'shared/templates/ModalView.html'
                    });
                },
        };
    }
]);