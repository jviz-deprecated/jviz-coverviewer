//Move to a position
jviz.modules.coverviewer.prototype.move = function(pos)
{
  //Check the position
  if(typeof pos === 'undefined'){ return this; }

  //Set the draw start position
  this._draw.start = parseInt(pos);

  //Draw this new position
  this.draw();

  //Return this
  return this;
};

//Coverviewer move start
jviz.modules.coverviewer.prototype.moveStart = function(pos)
{
  //Check the position
  if(typeof pos !== 'undefined')
  {
    //Save the start position
    this._draw.region.start = parseInt(pos);
  }

  //Clear the background
  this.backgroundClear();

  //Clear the label
  this.labelClear();

  //Draw this new position
  this.draw();

  //Return this
  return this;
};

//Stop moving
jviz.modules.coverviewer.prototype.moveStop = function(pos)
{
  //Check the position
  if(typeof pos !== 'undefined')
  {
    //Set the draw start position
    this._draw.region.start = parseInt(pos);
  }

  //Draw with the background
  this.draw({ background: true });

  //Return this
  return this;
};
