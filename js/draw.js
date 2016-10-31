//CoverViewer draw
jviz.modules.coverviewer.prototype.draw = function(opt)
{
  //Save the options
  if(typeof opt === 'undefined'){ var opt = {}; }

  //Check the background
  if(typeof opt.background !== 'boolean'){ opt.background = this._draw.default.background; }

  //Check the samples
  if(typeof opt.samples !== 'boolean'){ opt.samples = this._draw.default.samples; }

  //Check the points
  if(typeof opt.points !== 'boolean'){ opt.points = this._draw.default.points; }

  //Check the marks
  if(typeof opt.marks !== 'boolean'){ opt.marks = this._draw.default.marks; }

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
  if(opt.background === true) { this.backgroundDraw(); }

  //Draw the control points
  if(opt.points === true){ this.pointsDraw(); }

  //Draw the samples
  if(opt.samples === true){ this.samplesDraw(); }

  //Draw the marks
  if(opt.marks === true){ this.marksDraw(); }

  //Return this
  return this;
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

  //Clear the marks
  this.marksClear();

  //Return this
  return this;
};
