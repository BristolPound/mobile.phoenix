console.log("main.js");

//var books = require("./books.json");

new tabris.Drawer().append(new tabris.PageSelector());

// new tabris.Action({
	  // id: "licenseToggler",
	  // title: "Settings",
	  // placementPriority: "high",
	  // image: {src: "images/action_settings.png", scale: 3}
	// }).on("select", function() {
	  // createSettingsPage().open();
	// });



//new tabris.TextView({
//  layoutData: {centerX: 0, centerY: 0},
//  text: "Bristol Pound Mobile"
//}).appendTo(page);

window.plugins.toast.showShortTop("pre bP");

var pageBuilder = require("./pageBuilder");

window.plugins.toast.showShortTop("post bP");

var pageLogin = require("./login");

window.plugins.toast.showShortTop("post Login");

var pageDirectory = require("./Directory");


cordova.getAppVersion.getVersionNumber(function (version) {
	window.plugins.toast.showShortBottom(version);
});

pageBuilder.topPage.open();


