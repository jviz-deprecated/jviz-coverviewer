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
  jviz.cursor.set('move');

  //Clear the background
  this.backgroundClear();

  //Clear the label
  this.labelClear();

  //Emit the drag start event
  this.emit('drag:start', this._draw.start, this._draw.end);
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

    //Emit the drag move event
    this.emit('drag:move', this._draw.start, this._draw.end);

    //Continue
    return;
  }

  //Check click first
  //if(this.cover.clickfirst === true) { this.cover.clickfirst = false; }

  //Get the draw zone
  var draw = this._canvas.draw();

  //Show the hover position
  if(draw.margin.left <= x && x <= draw.margin.left + draw.width)
  {
    //Calculate the position
    this._draw.position = Math.floor(this._draw.start + x - draw.margin.left);

    //Draw the label
    this.labelDraw(x, y);
  }
};

//Mouse click up event
jviz.modules.coverviewer.prototype.mouseUp = function(e, x, y)
{
  //Set draw move as false
  this._draw.move = false;

  //Remove the cursor
  jviz.cursor.remove('move');

  //Draw the region
  this.draw();

  //Emit the drag stop event
  this.emit('drag:stop', this._draw.start, this._draw.end);
};
