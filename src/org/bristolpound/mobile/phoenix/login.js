
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
		createTextView("version 0.0.3.dev6")
		input = new tabris.TextInput({
		    text: "your message",
		    layoutData: {left: 10, top: 10, right: 10}
		}).appendTo(parent);
		
		buttonShortCenter = new tabris.Button({
		    layoutData: {left: 10, top: [40, 10], right: 10},
		    text: "Show short center"
		  }).appendTo(parent).on("select", function() {
			  window.plugins.pinDialog.prompt("hello", onDeviceReady, "title", ["OK","Cancel"]);
			 
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
	
	
	var listeners = [
		'TagDiscovered',
		'MimeType',
		'Ndef',
		'MifareUltralight',
		'MifareClassic',
		'NdefFormatable'
		];
	
	for(listener of listeners)
	{
		for(api of ['', '2'])
		{
			var f = 'add'+listener+'Listener'+api;
			
			console.log("NFC "+listener+api+" ...");
			nfc[f](function(nfcEvent)
			{
				console.log("NFC "+listener+api+" event!");
				console.log(JSON.stringify(nfcEvent));
				//window.plugins.toast.showShortTop(nfcEvent.type);
				//createTextView(type);
			},
			function ()
			{
				console.log("NFC add"+listener+"Listener"+api+" is listening");
				window.plugins.toast.showShortTop("listening");
			},
			function ()
			{
				console.log("NFC "+listener+api+" registration failed");
				window.plugins.toast.showShortTop("registration failed");
			}
			);
		}
	}
	

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