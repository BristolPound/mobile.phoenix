
var pageBuilder = require("./pageBuilder");

var page = pageBuilder.topPageBuilder
(
	 "Login"
	,"Login to your Bristol Pound account"
	,function(parent)
	{
		  var input = new tabris.TextInput({
		    text: "your message",
		    layoutData: {left: 10, top: 10, right: 10}
		  }).appendTo(parent);
	}
);