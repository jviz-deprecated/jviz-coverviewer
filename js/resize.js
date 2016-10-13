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

  //Calculate the draw zone
  this._draw.height = draw.height;

  //Calculate the label position y
  this._label.posy = this._height - draw.margin.bottom + this._label.margin;

  //Draw the graphic
  this.draw();

  //Emit the resize event
  this.emit('resize', this._draw.start, this._draw.end, this._draw.length);
};
