rootModule.directive('vayamMap', function(){
	return {
		restrict: 'E',
		templateUrl: 'components/locationmap/locationmap.html',
		replace: true,
		transclude : true,
		scope: true,
		controller: ['$scope', 'contactUsService', function ($scope, contactUsService) {
			contactUsService.getLocations().then(function(response) {
				var locations = response.data;
				$scope.locations = locations;

				var bounds = new google.maps.LatLngBounds();
				var canvas = document.getElementById('map');
				var map = new google.maps.Map(canvas);
				var infoWindow = new google.maps.InfoWindow(), marker, i, markers = [];
				for ( i = 0; i < locations.length; i++) {
					var position = new google.maps.LatLng(locations[i].coordinates.latitude, locations[i].coordinates.longitude);
					bounds.extend(position);
					marker = new google.maps.Marker({
						position: position,
						map: map,
						title: locations[i][0],
						animation: google.maps.Animation.BOUNCE
					});

					// Allow each marker to have an info window
					google.maps.event.addListener(marker, 'click', (function(marker, i) {
						return function() {
							//infoWindow.setContent(infoWindowContent[i][0]);
							infoWindow.setContent("<div><h4>" + locations[i].name + "</h4><address>" + locations[i].address + locations[i].pincode + "</address></div>");
							infoWindow.open(map, marker);
						}
					})(marker, i));

					// Automatically center the map fitting all markers on the screen
					map.fitBounds(bounds);

					// Push the marker to the 'markers' array
					markers.push(marker);
				};

				$scope.openMapInfoWindow = function(markerindex) {
					markers = markers || [];
					google.maps.event.trigger(markers[markerindex], 'click');
				}

			}, function() {
				console.log('Error during location data fetching!');
			});
		}]
	};
});
