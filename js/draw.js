//CoverViewer draw
jviz.modules.coverviewer.prototype.draw = function()
{
  //Check if has data to display
  if(this._cover.has === false){ return; }

  //Check the start point
  if(this._draw.start < this._cover.start){ this._draw.start = this._cover.start; }

  //Check the end point
  if(this._cover.end < this._draw.start + this._draw.length)
  {
    //Update the region start
    this._draw.start = this._cover.end - this._draw.length;
  }

  //Save the end point
  this._draw.end = this._draw.start + this._draw.length;

  //Draw the background
  if(this._draw.move === false){ this.backgroundDraw(); }

  //Draw the axis
  if(this._axis.draw === true){ this.axisDraw(); } 

  //Draw the control points
  this.pointsDraw();

  //Draw the coverage values
  this.samplesDraw();

  //Draw the marks
  //this.marksDraw();

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
