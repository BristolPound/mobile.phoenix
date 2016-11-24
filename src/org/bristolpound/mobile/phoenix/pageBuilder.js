console.log("pageBuilder.js");

/**
 * http://usejsdoc.org/
 */
var PAGE_MARGIN = 16;

var
  TopPage
, TopPageBuilder
, tray
, trayShade
, trayHeight
, trayState = 'up'
, dragOffset
, topPages = []
;

if (!TopPage)
{
	var cvMain = new tabris.CollectionView({
		layoutData: {left: 0, right: 0, top: 0, bottom: 0},
		itemHeight: 72,
		items: topPages,
		initializeCell: function(cell) {
		    var imageView = new tabris.ImageView({
		      layoutData: {left: PAGE_MARGIN, centerY: 0, width: 32, height: 48},
		      scaleMode: "fit"
		    }).appendTo(cell);
		    var titleTextView = new tabris.TextView({
		      layoutData: {left: 64, right: PAGE_MARGIN, top: PAGE_MARGIN},
		      markupEnabled: true,
		      textColor: "#4a4a4a"
		    }).appendTo(cell);
		    var descTextView = new tabris.TextView({
		      layoutData: {left: 64, right: PAGE_MARGIN, top: [titleTextView, 4]},
		      textColor: "#7b7b7b"
		    }).appendTo(cell);
		    cell.on("change:item", function(widget, entry) {
		      //imageView.set("image", entry.image);
		      titleTextView.set("text", entry.pageName);
		      descTextView.set("text", entry.pageDescription);
		    });
		  }
	}).on("select", function(target, value) {
	  //createBookPage(value).open();
		//alert(value);
	});

	var TopPage = new tabris.Page({
	  title: "Bristol Pound",
	  topLevel: true
	}).append(cvMain);

	var trayShade = new tabris.Composite({
	  layoutData: {left: 0, right: 0, top: 0, bottom: 0},
	  background: 'black',
	  opacity: 0
	}).appendTo(TopPage);

	var tray = new tabris.Composite({
	  layoutData: {left: 0, right: 0, top: '30%', bottom: 0}
	}).appendTo(TopPage);

	var strap = new tabris.Composite({
	  layoutData: {left: '40%', right: '40%', top: 0, height: 65},
	  background: '#259b24'
	}).appendTo(tray);

	var strapIcon = new tabris.TextView({
	  layoutData: {left: PAGE_MARGIN, right: PAGE_MARGIN, top: 20},
	  alignment: 'center',
	  text: '⇧',
	  font: 'bold 24px',
	  textColor: 'white'
	}).appendTo(strap);

	var trayContent = new tabris.Composite({
	  layoutData: {left: PAGE_MARGIN, right: PAGE_MARGIN, top: [strap, 0], bottom: 0},
	  background: '#8bc34a'
	}).appendTo(tray);

	new tabris.TextView({
	  layoutData: {left: PAGE_MARGIN, right: PAGE_MARGIN, top: PAGE_MARGIN},
	  alignment: 'center',
	  text: 'Tray content',
	  font: 'bold 24px',
	  textColor: 'white'
	}).appendTo(trayContent);

	trayContent.on('resize', function() {
	  var bounds = trayContent.get("bounds");
	  trayHeight = bounds.height;
	  if (trayState === 'dragging') {
	    positionTrayInRestingState(2000);
	  } else {
	    tray.set('transform', {translationY: trayHeight});
	  }
	});

	strap.on('pan:vertical', function(widget, event) {
	  if (event.state === 'start' && (trayState === 'up' || trayState === 'down')) {
	    trayState = 'dragging';
	    dragOffset = (tray.transform ? tray.transform.translationY : 0 ) - event.translation.y;
	  }
	  if (trayState === 'dragging') {
	    var offsetY = Math.min(Math.max(event.translation.y + dragOffset, 0), trayHeight);
	    tray.set('transform', {translationY: offsetY});
	    trayShade.set('opacity', getShadeOpacity(offsetY));
	    strapIcon.set('transform', getStrapIconTransform(offsetY));
	  }
	  if (event.state === 'end' && trayState === 'dragging') {
	    positionTrayInRestingState(event.velocity.y);
	  }
	});

	strap.on('tap', function() {
	  if (trayState === 'up' || trayState === 'down') {
	    positionTrayInRestingState(trayState === 'down' ? -1000 : 1000);
	  }
	});
	
	positionTrayInRestingState(1000);
}

TopPageBuilder = function(pageName, pageDescription, createCallback) {
  this.pageName = pageName;
  this.pageDescription = pageDescription;
  this.createCallback = createCallback;
  topPages.push(this);
};

TopPageBuilder.prototype.create = function() {

	  this.page = new tabris.Page({
	    title: this.pageName,
	    topLevel: true
	  });
	  
	  var content = new tabris.Composite({
	    layoutData: {left: 10, top: "prev() 10", right: 10, bottom: 0}
	  }).appendTo(this.page);
	  
	  this.page.append(trayShade);
	  this.page.append(tray);
	  
	  this.createCallback(content);
	  return this;
};

TopPageBuilder.prototype.open = function() {
	  this.page.open();
	  return this;
};

module.exports.topPage = TopPage;
module.exports.topPageBuilder = TopPageBuilder;


function positionTrayInRestingState(velocity) {
  trayState = 'animating';
  var translationY = velocity > 0 ? trayHeight : 0;
  var options = {
    duration: Math.min(Math.abs(trayHeight / velocity * 1000), 800),
    easing: Math.abs(velocity) >= 1000 ? 'ease-out' : 'ease-in-out'
  };
  trayShade.animate({opacity: getShadeOpacity(translationY)}, options);
  strapIcon.animate({transform: getStrapIconTransform(translationY)}, options);
  tray
    .animate({transform: {translationY: translationY}}, options)
    .then(function() {
      trayState = velocity > 0 ? 'down' : 'up';
    });
}

function getShadeOpacity(translationY) {
  var traveled = translationY / trayHeight;
  return Math.max(0, 0.75 - traveled);
}

function getStrapIconTransform(translationY) {
  var traveled = translationY / trayHeight;
  return {rotation: traveled * Math.PI - Math.PI};
}

