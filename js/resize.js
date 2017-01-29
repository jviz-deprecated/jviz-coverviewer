//Resize the panel
jviz.modules.coverviewer.prototype.resize = function()
{
  //Resize the canvas element
  this._canvas.el.resize();

  //Get the draw element
  var draw = this._canvas.el.draw();

  //Calculate the draw width
  this._draw.width = draw.width;

  //Calculate the draw zone
  this._draw.height = draw.height;

  //Calculate the zooming values
  this.zoomUpdate();

  //Calculate the label position y
  this._label.posy = this._height - draw.margin.bottom + this._label.margin;

  //Calculate the label line height
  this._label.line.height = draw.height;

  //Draw the axis again
  this._axis.draw = true;

  //Emit the resize event
  this._events.emit('resize', this._draw.width, this._draw.height);

  //Return this
  return this;
};
