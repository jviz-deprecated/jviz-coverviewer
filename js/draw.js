//CoverViewer draw
jviz.modules.coverviewer.prototype.draw = function(opt)
{
  //Check the option
  if(typeof opt === 'object')
  {
    //Save the start position
    if(typeof opt.start !== 'undefined'){ this._draw.start = parseInt(opt.start); }

    //Save the draw move
    if(typeof opt.move !== 'undefined'){ this._draw.move = opt.move; }
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
  this.drawBackground();

  //Draw the control points
  //this.PointsDraw(canvas, this.cover.draw.start, this.cover.draw.end, this.cover.height, this.cover.draw.margin);

  //Draw the samples
  this.drawSamples();

  //Reset the draw move
  this._draw.move = false;
};

//Draw the background
jviz.modules.coverviewer.prototype.drawBackground = function()
{
  //Check the draw on move
  if(this._draw.move === true){ return; }

  //Get the draw zone
  var draw = this._canvas.draw();

  //Get the canvas layer
  var canvas = this._canvas.layer(this._draw.bg.layer);

  //Clear the layer
  canvas.Clear();

  //Lines array
  var lines = jviz.array.create(this._samples.count, []);

  //Real position counter
  var p = draw.margin.left;

  //Read all the positions
  for(var i = this._draw.start; i < this._draw.end; i++)
  {
    //Get the cover array
    var cover = (typeof this._data.normalized[i] === 'undefined') ? this._samples.empty : this._data.normalized[i];

    //Draw the lines
    for(var j = 0; j < this._samples.count; j++)
    {
      //Calculate the y position
      var py = this._height - draw.margin.bottom - cover[j];

      //Push
      lines[j].push([p, py]);
    }

    //Increment the counter
    p = p + 1;
  }

  //Draw all the lines
  for(var j = 0; j < this._samples.count; j++)
  {
    //Draw the line
    canvas.Line(lines[j]);

    //Set the line style
    canvas.Stroke({ width: this._draw.bg.stroke, color: this._draw.bg.color, opacity: this._draw.bg.opacity });
  }

  //Initialize the position y for the cover label
  //this.cover.label.posy = this.cover.height - this.cover.draw.margin.bottom + this.cover.label.margin;

  //Initialize the height for the line
  //this.cover.hover.height = this.cover.draw.height;
};

//Draw the samples
jviz.modules.coverviewer.prototype.drawSamples = function()
{
};
