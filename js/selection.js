//Add a selection
jviz.modules.coverviewer.prototype.selection = function(start, end)
{
  //Continue
  return this;
};

//Draw the selection
jviz.modules.coverviewer.prototype.selectionDraw = function()
{
  //Check if selection is enabled
  if(this._selection.enabled === false){ return this; }

  //Get the draw zone
  var draw = this._canvas.el.draw();

  //Get the canvas layer
  var canvas = this._canvas.el.layer(this._selection.layer);

  //Clear the layer
  canvas.Clear();

  //Get the rectangle position x
  var rect_x = this._selection.click.start;

  //Get the rectangle position y
  var rect_y = draw.margin.left;

  //Get the rectangle width
  var rect_width = this._selection.click.end - this._selection.click.start;

  //Get the rectangle height
  var rect_height = draw.height;

  //Draw the selection rectangle
  canvas.Rect({ x: rect_x, y: rect_y, width: rect_width, height: rect_height });

  //Fill the rectanle
  canvas.Fill({ color: this._selection.color, opacity: this._selection.rect.opacity });

  //Continue
  return this;
};

//Selection down
jviz.modules.coverviewer.prototype.selectionDown = function(x, y)
{
  //Active the click
  this._selection.click.active = true;

  //Save the original click position
  this._selection.click.original = x;

  //Initialize the start point
  this._selection.click.start = x;

  //Initialize the end point
  this._selection.click.end = x;

  //Activeate the selection move
  this._selection.click.move = true;
};

//Selection move
jviz.modules.coverviewer.prototype.selectionMove = function(x, y)
{
  //Check if selection move is active
  if(this._selection.click.move === false){ return; }

  //Check the posiiton x

  //Get the difference
  var diff = x - this._selection.click.original;

  //Check the orientation
  if(diff < 0)
  {
    //Save the click start point
    this._selection.click.start = x;

    //Save the click end point
    this._selection.click.end = this._selection.click.original;
  }
  else
  {
    //Save the click start point
    this._selection.click.start = this._selection.click.original;

    //Save the click end point
    this._selection.click.end = x;
  }

  //Get the selection start
  this._selection.start = this._draw.start + this._draw.length * (this._selection.click.start - this._draw.margin) / this._draw.width;

  //Get the selection end
  this._selection.end = this._draw.start + this._draw.length * (this._selection.click.end - this._draw.margin) / this._draw.width;

  //Draw the selection
  this.selectionDraw();
};

//Selection up
jviz.modules.coverviewer.prototype.selectionUp = function(x, y)
{
  //Check if is active
  if(this._selection.click.active === false){ return; }

  //Set active as false
  this._selection.click.active = false;

  //Disable the selection move
  this._selection.click.move = false;

  //Emit the selection event
};
