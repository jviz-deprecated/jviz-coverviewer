//CoverViewer draw
jviz.modules.coverviewer.prototype.draw = function(opt)
{
  //Check the option
  if(typeof opt === 'object')
  {
    //Save the start position
    if(typeof opt.start !== 'undefined'){ this._draw.start = parseInt(opt.start); }
  }

  //Get the actual draw
  var draw = this._canvas.draw();

  //Save the length window
  this._draw.length = draw.width;

  //Check the start point
  if(this._draw.start < this._data.start){ this._draw.start = this._data.start; }

  //Save the end point
  this._draw.end = this._draw.start + this._draw.length;

  //Check the end point
  if(this._data.end < this._draw.end)
  {
    //Replace the end point
    this._draw.end = this._data.end;

    //Replace the start point
    this._draw.start = this._draw.end - this._draw.length;
  }

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
};
