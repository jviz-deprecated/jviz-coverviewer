//Coverviewer move start
jviz.modules.coverviewer.prototype.moveStart = function(pos)
{
  //Check the position
  if(typeof pos === 'undefined'){ return this; }

  //Save the start position
  this._draw.region.start = parseInt(pos);

  //Clear the background
  this.backgroundClear();

  //Clear the label
  this.labelClear();

  //Draw this new position
  this.draw({ background: false });

  //Return this
  return this;
};

//Move to a position
jviz.modules.coverviewer.prototype.moveTo = function(pos)
{
  //Check the position
  if(typeof pos === 'undefined'){ return this; }

  //Set the draw start position
  this._draw.region.start = parseInt(pos);

  //Draw this new position
  this.draw({ background: false });

  //Return this
  return this;
};

//Stop moving
jviz.modules.coverviewer.prototype.moveStop = function(pos)
{
  //Check the position
  if(typeof pos === 'undefined'){ return this; }

  //Set the draw start position
  this._draw.region.start = parseInt(pos);

  //Draw with the background
  this.draw({ background: true });

  //Return this
  return this;
};
