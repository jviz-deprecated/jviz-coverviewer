//Apply a zoom level
jviz.modules.coverviewer.prototype.zoom = function(value)
{
  //Check the zoom value
  if(typeof value !== 'number'){ return this._zoom.value; }

  //Save the zoom value
  this._zoom.value = (this._zoom.fixed === true) ? this._zoom.default : value;

  //Check the zoom min value
  if(this._zoom.value < this._zoom.min){ this._zoom.value = this._zoom.min; }

  //Check the zoom max value
  if(this._zoom.value > this._zoom.max){ this._zoom.value = this._zoom.max; }

  //Update the draw length
  this._draw.length = this._draw.width / this._zoom.value;

  //Return this
  return this;
};

//Updte the zoom value
jviz.modules.coverviewer.prototype.zoomUpdate = function()
{
  //Calculate the min zoom value
  this._zoom.min = this._draw.width / this._cover.length;

  //Apply the zoom level
  this.zoom(this._zoom.value);

  //Return this
  return this;
};

//Zoom in
jviz.modules.coverviewer.prototype.zoomIn = function()
{
  //Check if zoom is fixed
  if(this._zoom.fixed === true){ return this; }

  //Update the zoom
  this.zoom(this._zoom.value + this._zoom.increment);

  //Draw all
  return this.draw();
};

//Zoom out
jviz.modules.coverviewer.prototype.zoomOut = function()
{
  //Check if zoom is fixed
  if(this._zoom.fixed === true){ return this; }

  //Update the zoom
  this.zoom(this._zoom.value - this._zoom.increment);

  //Draw all
  return this.draw();
};
