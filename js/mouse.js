//Register the mouse events
jviz.modules.coverviewer.prototype.mouseEvent = function()
{
  //Save this
  var self = this;

  //Get the last layer ID
  var id = this._canvas.layerID(this._layers - 1);

  //Save this
  var self = this;

  //Add the mouse down event
  jviz.mouse.down(id, function(e, x, y){ return self.mouseDown(e, x, y); });

  //Add the mouse move event
  jviz.mouse.move(id, function(e, x, y){ return self.mouseMove(e, x, y); });

  //ADd the mouse up event
  jviz.mouse.up(id, function(e, x, y){ return self.mouseUp(e, x, y); });
};

//Mouse click down event
jviz.modules.coverviewer.prototype.mouseDown = function(e, x, y)
{
  //Check for loading
  if(this.loading() === true){ return;}

  //Activate the move
  this._draw.move = true;

  //Activate the click first
  this._draw.click.first = true;

  //Save the click position
  this._draw.click.point = x;

  //Save the start position
  this._draw.click.start = this._draw.start;

  //Add the cursor

  //Clear the background
  this.backgroundClear();

  //Emit the click down event
  this.emit('mouse:down', this._draw.start, this._draw.end);
};

//Mouse move event
jviz.modules.coverviewer.prototype.mouseMove = function(e, x, y)
{
  //Check for loading
  if(this.loading() === true){ return; }

  //Check for move
  if(this._draw.move === true)
  {
    //Calculate the difference
    var diff = this._draw.click.point - x;

    //Calculate the start point
    this._draw.start = this._draw.click.start + diff;

    //Draw the region
    this.draw();

    //Emit the move event
    this.emit('mouse:move', this._draw.start, this._draw.end);
  }

  //Check click first
  //if(this.cover.clickfirst === true) { this.cover.clickfirst = false; }

  //Show the hover position
  /*
  if(this.cover.draw.margin.left <= x && x <= this.cover.draw.margin.left + this.cover.draw.width)
  {
    //Draw the hover line
    this.CoverTrackDrawHover(x, y);

    //Draw the label
    this.CoverTrackDrawLabel(x);
  }
  */
};

//Mouse click up event
jviz.modules.coverviewer.prototype.mouseUp = function(e, x, y)
{
  //Set draw move as false
  this._draw.move = false;

  //Remove the cursor

  //Draw the region
  this.draw();

  //Emit the mouse up event
  this.emit('mouse:up', this._draw.start, this._draw.end);
};