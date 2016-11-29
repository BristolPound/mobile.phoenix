
console.log("Directory.js");


var pageBuilder = require("./pageBuilder");

var
 input
,buttonShortCenter
;

var page = new pageBuilder.topPageBuilder
(
	 "Directory"
	,"All traders accepting Bristol Pound"
	,function(parent)
	{
		
		buttonShortCenter = new tabris.Button({
		    layoutData: {left: 10, top: [10, 10], right: 10},
		    text: "Load"
		  }).appendTo(parent).on("select", function() {
			  loadData();
			  
			  // onSuccess Callback
			    // This method accepts a Position object, which contains the
			    // current GPS coordinates
			    //
			    var onSuccess = function(position) {
			        alert('Latitude: '          + position.coords.latitude          + '\n' +
			              'Longitude: '         + position.coords.longitude         + '\n' +
			              'Altitude: '          + position.coords.altitude          + '\n' +
			              'Accuracy: '          + position.coords.accuracy          + '\n' +
			              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
			              'Heading: '           + position.coords.heading           + '\n' +
			              'Speed: '             + position.coords.speed             + '\n' +
			              'Timestamp: '         + position.timestamp                + '\n');
			    };

			    // onError Callback receives a PositionError object
			    //
			    function onError(error) {
			        alert('code: '    + error.code    + '\n' +
			              'message: ' + error.message + '\n');
			    }

			    navigator.geolocation.getCurrentPosition(onSuccess, onError);
		  });
		
	}
).create();

function createTextView(text) {
  new tabris.TextView({
    text: text,
    markupEnabled: true,
    layoutData: {left: 16, right: 16, top: "prev() 12"},
    class: "locationData"
  }).appendTo(page);
}

function createReloadButton() {
  new tabris.Button({
    layoutData: {left: 16, right: 16, top: "prev() 12"},
    text: "Reload Geo-Data",
    id: "reloadButton"
  }).on("select", loadData).appendTo(page);
}

function loadData() {
  // Dispose existing elements via the class selector
  page.children(".locationData").dispose();
  page.children("#reloadButton").dispose();

  // Create loading indicator
  var activityIndicator = new tabris.ActivityIndicator({centerX: 0, centerY: 0}).appendTo(page);

  // Run async remote request with fetch
  fetch("https://freegeoip.net/json/").then(function(response) {
    return response.json();
  }).catch(function(err) {

    // On error show want went wrong and reload button.
    createTextView("Failure: " + err || "Error loading geo-data");
    createReloadButton();
  }).then(function(json) {

    // Dispose of the activity loader via direct reference
    activityIndicator.dispose();

    // Show the result location data
    createTextView("The IP address is: " + json.ip);
    createTextView("City: " + json.city);
    createTextView("Country: " + json.country_name);
    createTextView("Latitude: " + json.latitude);
    createTextView("Longitude: " + json.longitude);

    // Create the reload button
    createReloadButton();
});
}

