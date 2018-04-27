rootModule.directive('vayamMap', function(){
	return {
		restrict: 'E',
		templateUrl: '/shared/googlemap/locationmap.html',
		replace: true,
		transclude : true,
		scope: true,
		controller: ['$scope', 'contactUsService', function ($scope, contactUsService) {
			contactUsService.getLocations().then(function(response) {
				var locations = response.data;
				$scope.locations = locations;

				var canvas = document.getElementById('map');
				var infoWindow = new google.maps.InfoWindow();
				var mapProp= {
					center: new google.maps.LatLng($scope.locations[0].coordinates.latitude, $scope.locations[0].coordinates.longitude),
					zoom: 10,
				};
								
				var map = new google.maps.Map(canvas, mapProp);
				var position = new google.maps.LatLng(locations[0].coordinates.latitude, locations[0].coordinates.longitude);
				marker = new google.maps.Marker({
					position: position,
					map: map,
					title: locations[0].name,
					animation: google.maps.Animation.BOUNCE
				});
			}, function() {
				console.log('Error during location data fetching!');
			});
		}]
	};
});
