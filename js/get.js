//Get the draw window
jviz.modules.coverviewer.prototype.getDraw = function()
{
  //Return the draw size
  return { width: this._draw.width, height: this._draw.height };
};

//Get the actual draw region
jviz.modules.coverviewer.prototype.getRegion = function()
{
  //Return the region info
  return { start: this._draw.region.start, end: this._draw.region.end, length: this._draw.region.length };
};
