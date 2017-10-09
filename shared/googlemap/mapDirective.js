rootModule.directive('vayamMap', function(){
    return {
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        link: function (scope, ielement, attr) {
            var vayamcenter = new google.maps.LatLng(19.905004, 73.231295);
            var canvas = document.getElementById(attr.id);
        	var mapProp= {
        		center: vayamcenter,
        		zoom: 10
        	};

        	var map = new google.maps.Map(canvas, mapProp);
        	var marker = new google.maps.Marker({
        		position: vayamcenter,
        		animation:google.maps.Animation.BOUNCE
        	});
        	marker.setMap(map);
        }
    };
});
