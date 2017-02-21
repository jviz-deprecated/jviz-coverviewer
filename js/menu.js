//Build the menu
jviz.modules.coverviewer.prototype.menu = function()
{
  //Save this
  var self = this;

  //Add the samples button
  this._panel.el.btn(this._menu.samples);

  //Add the zoom in button
  this._panel.el.btn(this._menu.zoomin);

  //Add the zoom out button
  this._panel.el.btn(this._menu.zoomout);

  //Add the preview button icon event
  jviz.dom.event(this._menu.samples.id, 'click', function(e){ return self.menuSamples(); });

  //Add the zoom in button event
  jviz.dom.event(this._menu.zoomin.id, 'click', function(el){ return self.menuZoomIn(); });

  //Add the zoom out button event
  jviz.dom.event(this._menu.zoomout.id, 'click', function(el){ return self.menuZoomOut(); });
};

//Click on the samples button
jviz.modules.coverviewer.prototype.menuSamples = function()
{
  //Emit the event
  this._events.emit('btn:samples');

  //Show/Hide the samples table
  this.table();
};

//Click on the zoom in button
jviz.modules.coverviewer.prototype.menuZoomIn = function()
{
  //Emit the event
  this._events.emit('btn:zoom-in');

  //Call the zoom in method
  this.zoomIn();
};

//Click on the zoom out button
jviz.modules.coverviewer.prototype.menuZoomOut = function()
{
  //Emit the event
  this._events.emit('btn:zoom-out');

  //Call the zoom out method
  this.zoomOut();
};
