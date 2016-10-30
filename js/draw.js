//CoverViewer draw
jviz.modules.coverviewer.prototype.draw = function(start)
{
  //Save the start position
  if(typeof start !== 'undefined'){ this._draw.region.start = parseInt(start); }

  //Check if has data to display
  if(this._data.has === false){ return; }

  //Save the length window
  this._draw.region.length = this._draw.width;

  //Check the start point
  if(this._draw.region.start < this._data.start){ this._draw.region.start = this._data.start; }

  //Check the end point
  if(this._data.end < this._draw.region.start + this._draw.region.length)
  {
    //Update the region start
    this._draw.region.start = this._data.end - this._draw.region.length;
  }

  //Save the end point
  this._draw.region.end = this._draw.region.start + this._draw.region.length;

  //Draw the background
  this.backgroundDraw();

  //Draw the control points
  this.pointsDraw();
  //this.PointsDraw(canvas, this.cover.draw.start, this.cover.draw.end, this.cover.height, this.cover.draw.margin);

  //Draw the samples
  this.samplesDraw();
};

//Manage the move status
jviz.modules.coverviewer.prototype.move = function(status)
{
  //Check the status
  if(typeof status === 'undefined'){ return this._draw.move; }

  //Update the move status
  this._draw.move = status;
};

//Clear
jviz.modules.coverviewer.prototype.clear = function()
{
  //Clear the background
  this.backgroundClear();

  //Clear the points
  this.pointsClear();

  //Clear the samples
  this.samplesClear();

  //Clear the label
  this.labelClear();
};
