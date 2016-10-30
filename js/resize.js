//Resize events
jviz.modules.coverviewer.prototype.resizeEvent = function()
{
  //Save this
  var self = this;

  //Add the resize event
  $(window).resize(function(){ self.resize(); });

  //Resize the first time
  this.resize();
};

//Resize the panel
jviz.modules.coverviewer.prototype.resize = function()
{
  //Resize the canvas element
  this._canvas.resize();

  //Get the draw element
  var draw = this._canvas.draw();

  //Calculate the draw width
  this._draw.width = draw.width;

  //Calculate the draw zone
  this._draw.height = draw.height;

  //Calculate the label position y
  this._label.posy = this._height - draw.margin.bottom + this._label.margin;

  //Calculate the label line height
  this._label.line.height = draw.height;

  //Draw the graphic
  this.draw({ background: true });

  //Emit the resize event
  this._events.emit('resize', this._draw.width, this._draw.height);
};
