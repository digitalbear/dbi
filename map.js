/*
 * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html
 * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
 */
$( document ).on( "pageshow", "#map-page", function() {
	console.log("page loading");
	var defaultLatLng = new google.maps.LatLng(50.371087,-4.144646);  // Default to Plymouth when no geolocation support
	if ( navigator.geolocation ) {
		function success(pos) {
			// Location found, show map with these coordinates
			drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
		}
		function fail(error) {
			var errors = {
				1: 'Permission denied - You may need to change your location settings to allow',
				2: 'Position unavailable',
				3: 'Request timeout'
			};
			console.log("Error: " + errors[error.code]);
			alert("Error: " + errors[error.code]);
			// drawMap(defaultLatLng);  // Failed to find location, show default map
		}
		// Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
		// enableHighAccuracy - is this required?
		navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
	} else {
		drawMap(defaultLatLng);  // No geolocation support, show default map
	}
	
	function drawMap(currLatLng) {
		var mapOptions = {
			zoom: 7,
			center: currLatLng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
		
		// read the data from file
		$.getJSON("markers.json", function(jsonRec) {
			var mapIcon = 'images/icon.png';
			$.each(jsonRec, function(key, data) {
				// Get the Latitude and Longitude from the file
				var latLng = new google.maps.LatLng(data.Latitude, data.Longitude); 
				// Create a marker and put it on the map
				var marker = new google.maps.Marker({
					position: latLng,
					title: data.Instructor + ", " + data.City,
					icon: mapIcon
				});
				// Add an info window
				var infoWindow = new google.maps.InfoWindow({
					content:'<div class="info-window"><img src="images/' + data.Photo + '" width="50" height="50">'
					+ '<b>  ' + data.Instructor + '</b>'
					+ '<p><i>' + data.Bio + '</i></p>'
					+ '<p>Location: ' + data.City + ', ' + data.Country + '</p>'
					+ '<p>Language/s: ' + data.Language + '</p>'
					+ '<p>Specialities: ' + data.DiveSite + '</p>'
					+ '<p>Countries: ' + data.DiveCountry + '</p>'
					+ '</div>'
				});
				google.maps.event.addListener(marker, 'click', function() {
					infoWindow.open(map,marker);
				});					
			marker.setMap(map);
			});
		});
	}
});	