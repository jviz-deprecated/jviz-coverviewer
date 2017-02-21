//Mouse click down event
jviz.modules.coverviewer.prototype.mouseDown = function(e, x, y)
{
  //Check for loading
  if(this.loading() === true){ return;}

  //Check for selection active
  if(this._selection.active === true)
  {
    //Call the selection down
    return this.selectionDown(x, y);
  }

  //Activate the move
  //this._draw.move = true;

  //Activate the click first
  this._draw.click.first = true;

  //Save the click position
  this._draw.click.point = x;

  //Save the start position
  this._draw.click.start = this._draw.start;
};

//Mouse move event
jviz.modules.coverviewer.prototype.mouseMove = function(e, x, y)
{
  //Check for loading
  if(this.loading() === true){ return; }

  //Check the selection move is active
  if(this._selection.active === true)
  {
    //Call the selection move
    return this.selectionMove(x, y);
  }

  //Check the click first
  if(this._draw.click.first === true)
  {
    //Set move as true
    this._draw.move = true;

    //Remove the click first
    this._draw.click.first = false;

    //Emit the drag start event
    this._events.emit('drag:start', this._draw.start, this._draw.end, this._draw.length);

    //Clear the background
    this.backgroundClear();

    //Clear the label
    //this.labelClear();

    //Add the cursor
    jviz.cursor.set('move');
  }

  //Check for move
  if(this._draw.move === true)
  {
    //Calculate the difference
    var diff = this._draw.click.point - x;

    //Calculate the start point
    this._draw.start = this._draw.click.start + diff / this._zoom.value;

    //Draw the region
    this.draw();

    //Emit the drag move event
    this._events.emit('drag:move', this._draw.start, this._draw.end, this._draw.length);

    //Continue
    return;
  }

  //Get the draw zone
  var draw = this._canvas.el.draw();

  //Show the hover position
  if(draw.margin.left <= x && x <= draw.margin.left + draw.width)
  {
    //Calculate the position
    this._draw.position = Math.floor(this._draw.start + x - draw.margin.left);

    //Draw the label
    //this.labelDraw(x, y);
  }

  //Exit
  return;
};

//Mouse click up event
jviz.modules.coverviewer.prototype.mouseUp = function(e, x, y)
{
  //Check the selection up
  if(this._selection.active === true)
  {
    //Call the selection up
    return this.selectionUp(x, y);
  }

  //Check if draw move is active
  if(this._draw.move === true)
  {
    //Emit the drag stop event
    this._events.emit('drag:stop', this._draw.start, this._draw.end, this._draw.length);

    //Remove the cursor
    jviz.cursor.remove('move');
  }

  //Set draw move as false
  this._draw.move = false;

  //Reset the click first
  this._draw.click.first = false;

  //Draw the region
  this.draw();
};
