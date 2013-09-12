// default latitude and longitude values
var latitude = 50.371087;
var longitude = -4.144646;

$( document ).on( "pageinit", "#main", function() {
	$.getJSON("markers.json", function(jsonRec) {
		var str = "";
		$.each(jsonRec, function(key, val) {
			//str += "<li class='ui-screen-hidden'><a href='./search.html'>"+val.Instructor+"</a></li>";
			str += "<li class='ui-screen-hidden'><a onclick='showSearchLocation("+val.Latitude+","+val.Longitude+")'>"+val.Instructor+": "+val.DiveCountry+"</a></li>";
		});
		$("#searchList").html(str);
		$("#searchList").listview("refresh");
		$("#searchList").trigger( "updatelayout");							
	});			
});	

function getCurrentLocation() {
	if ( navigator.geolocation ) {
		function success(pos) {
			// Location found, show map with these coordinates
			latitude = pos.coords.latitude;
			longitude = pos.coords.longitude;
			console.log("navigator.geolocation success - coordinates: " + latitude + ", " + longitude);
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

function showSearchLocation(searchLat, searchLong) {
	latitude = searchLat;
	longitude = searchLong;
	console.log("nshowSearchLocation - coordinates: " + latitude + ", " + longitude);
	$.mobile.changePage("map.html")
}

/*
 * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html
 * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
 */
$( document ).on( "pageshow", "#map-page", function() {
	console.log("page loading");
	console.log("latitude: " + latitude + ", longitude: " + longitude);
	drawMap(new google.maps.LatLng(latitude, longitude));
	
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