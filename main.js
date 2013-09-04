
function getLocation() {
	if ( navigator.geolocation ) {
		function success(pos) {
			// Location found, show map with these coordinates
			console.log("navigator.geolocation successsss - coordinates: " + pos.coords.latitude + ", " + pos.coords.longitude);
			$.mobile.changePage("map.html")
		}
		function fail(error) {
			var errors = {
				1: 'Permission denied - You may need to change your location settings to allow',
				2: 'Position unavailable',
				3: 'Request timeout'
			};
			console.log("Error: " + errors[error.code]);
			$("#errorpopuptext").html(errors[error.code]);
			$("#locationerrorpopup").popup("open")
		}
		// Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
		navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:false, timeout: 6000});
	} else {
		console.log("navigator.geolocation error");
		$("#errorpopuptext").html("Your device does not appear to have geolocation support");
		$("#locationerrorpopup").popup("open")
	}
}