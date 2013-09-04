
function getLocation() {
	if ( navigator.geolocation ) {
		function success(pos) {
			// Location found, show map with these coordinates
			// drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
			console.log("navigator.geolocation success - coordinates: " + pos.coords.latitude + ", " + pos.coords.longitude);
		}
		function fail(error) {
			var errors = {
				1: 'Permission denied - You may need to change your location settings to provide your current location',
				2: 'Position unavailable',
				3: 'Request timeout'
			};
			console.log("Error: " + errors[error.code]);
			// alert("Error: " + errors[error.code]);
			$("#errortext").html(errors[error.code]);
			$.mobile.changePage("#locationerrordialog", { role: "dialog" } );
			// drawMap(defaultLatLng);  // Failed to find location, show default map
		}
		// Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
		// enableHighAccuracy - is this required?
		navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
	} else {
		console.log("navigator.geolocation error");
		// drawMap(defaultLatLng);  // No geolocation support, show default map
	}
}