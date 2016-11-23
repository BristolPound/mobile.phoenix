var page = new tabris.Page({
  topLevel: true,
  title: "Bristol Pound"
});

new tabris.TextView({
  layoutData: {centerX: 0, centerY: 0},
  text: "Bristol Pound Mobile"
}).appendTo(page);

page.open();
