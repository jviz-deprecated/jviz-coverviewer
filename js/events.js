//On method
jviz.modules.coverviewer.prototype.on = function(name, listener)
{
  //Register the event listener
  this._events.add(name, listener);

  //Continue
  return this;
};

//Emit the events
jviz.modules.coverviewer.prototype.events = function()
{
  //Save this
  var self = this;

  //Get the last layer ID
  var id = this._canvas.el.layerID(this._canvas.layers - 1);

  //Add the mouse down event
  jviz.commons.mouse.down(id, function(e, x, y){ return self.mouseDown(e, x, y); });

  //Add the mouse move event
  jviz.commons.mouse.move(id, function(e, x, y){ return self.mouseMove(e, x, y); });

  //ADd the mouse up event
  jviz.commons.mouse.up(id, function(e, x, y){ return self.mouseUp(e, x, y); });

  //Add the resize event
  jviz.dom.resize(function(){ self.resize().draw(); });

  //Resize the first time
  this.resize();

  //Return this
  return this;
};
