//Resize events
jviz.modules.coverviewer.prototype.resizeEvent = function()
{
  //Save this
  var self = this;

  //Add the resize event
  $(window).resize(function(){ self.resize(); });
};

//Resize the panel
jviz.modules.coverviewer.prototype.resize = function()
{
  //Resize the canvas element
  this._canvas.resize();

  //Draw the graphic
  this.draw();
};
