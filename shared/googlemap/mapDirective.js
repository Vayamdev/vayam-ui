rootModule.directive('vayamMap', function(){
	return {
		restrict: 'E',
		templateUrl: '/shared/googlemap/locationmap.html',
		replace: true,
		transclude : true,
		scope: true,
		controller: ['contactUsService', function (contactUsService) {
			contactUsService.getLocations().then(function(response) {
				var locations = response.data.items ? response.data.items[0].fields : response.data[0];
				var canvas = document.getElementById('map');
				var mapProp= {
					center: new google.maps.LatLng(locations.coordinates.lat, locations.coordinates.lon),
					zoom: 10,
				};
								
				var map = new google.maps.Map(canvas, mapProp);
				var position = new google.maps.LatLng(locations.coordinates.lat, locations.coordinates.lon);
				marker = new google.maps.Marker({
					position: position,
					map: map,
					title: locations.name,
					animation: google.maps.Animation.BOUNCE
				});
			}, function() {
				console.log('Error during location data fetching!');
			});
		}]
	};
});
