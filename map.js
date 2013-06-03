function initialize() {
	var mapOptions = {
  	center: new google.maps.LatLng(53.3428, -6.2661),
  	zoom: 8,
  	mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map = new google.maps.Map(document.getElementById("map-canvas"),
	mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);
