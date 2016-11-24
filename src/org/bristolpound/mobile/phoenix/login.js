
console.log("login.js");

//document.addEventListener("deviceready", onDeviceReady, false); 

var pageBuilder = require("./pageBuilder");

var
 input
,buttonShortCenter
;

var page = new pageBuilder.topPageBuilder
(
	 "Login"
	,"Login to your Bristol Pound account"
	,function(parent)
	{
		input = new tabris.TextInput({
		    text: "your message",
		    layoutData: {left: 10, top: 10, right: 10}
		}).appendTo(parent);
		
		buttonShortCenter = new tabris.Button({
		    layoutData: {left: 10, top: [40, 10], right: 10},
		    text: "Show short center"
		  }).appendTo(parent).on("select", function() {
			  onDeviceReady();
		  });

	}
).create();

function createTextView(text) {
	  new tabris.TextView({
	    text: text,
	    markupEnabled: true,
	    layoutData: {left: 16, right: 16, top: "prev() 12"}
//	    class: "locationData"
	  }).appendTo(page);
	}


function onDeviceReady()
{
	
	console.log("NFC readerMode ...");
	nfc.readerMode(
			{platformSounds: false},
	function () {
		console.log("NFC readerMode set");
		window.plugins.toast.showShortTop("listening");
	},
	function ()
	{
		console.log("NFC readerMode failed");
		window.plugins.toast.showShortTop("registration failed");
	}
	);
	
console.log("NFC addNdefListener ...");
nfc.addNdefListener(function(nfcEvent)
{
	console.log("NFC Ndef event!");
	console.log(JSON.stringify(nfcEvent));
	//window.plugins.toast.showShortTop(nfcEvent.type);
	//createTextView(type);
},
function ()
{
	console.log("NFC is listening");
	window.plugins.toast.showShortTop("listening");
},
function ()
{
	console.log("NFC registration failed");
	window.plugins.toast.showShortTop("registration failed");
}
);

console.log("NFC addTagDiscoveredListener ...");
nfc.addTagDiscoveredListener(function(nfcEvent)
{
	console.log("NFC Tag discovered!");
	console.log(JSON.stringify(nfcEvent));
	//window.plugins.toast.showShortTop(nfcEvent.type);
	//createTextView(nfcEvent.type);
},
function ()
{
	console.log("NFC is listening");
	window.plugins.toast.showShortTop("listening");
},
function ()
{
	console.log("NFC registration failed");
	window.plugins.toast.showShortTop("registration failed");
}
);


console.log("NFC addNdefFormatableListener ...");
nfc.addNdefFormatableListener(function(nfcEvent)
{
	console.log("NFC addNdefFormatableListener discovered!");
	console.log(JSON.stringify(nfcEvent));
	//window.plugins.toast.showShortTop(nfcEvent.type);
	//createTextView(nfcEvent.type);
},
function ()
{
	console.log("NFC is listening");
	window.plugins.toast.showShortTop("listening");
},
function ()
{
	console.log("NFC registration failed");
	window.plugins.toast.showShortTop("registration failed");
}
);

/*
 
console.log("NFC open settings");
nfc.showSettings(
function ()
{
	console.log("NFC settings");
	window.plugins.toast.showShortTop("settings");
},
function ()
{
	console.log("NFC settings failed");
	window.plugins.toast.showShortTop("registration failed");
});
*/

};


if (window.plugins.imeiplugin)
{
	
	//window.plugins.imeiplugin.getImei(callback);

	function callback(imei) {
	    console.log("My Android IMEI :" + imei);
	}
}