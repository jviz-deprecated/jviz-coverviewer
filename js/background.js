//Draw the background
jviz.modules.coverviewer.prototype.backgroundDraw = function()
{
  //Check the draw on move
  if(this._draw.move === true){ return; }

  //Get the draw zone
  var draw = this._canvas.draw();

  //Get the canvas layer
  var canvas = this._canvas.layer(this._bg.layer);

  //Clear the layer
  canvas.Clear();

  //Lines array
  var lines = [];

  //Initialize the array
  for(var j = 0; j < this._samples.count; j++){ lines[j] = []; }

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
    canvas.Stroke({ width: this._bg.width, color: this._bg.color, opacity: this._bg.opacity, join: this._bg.join });
  }

  //Initialize the position y for the cover label
  //this.cover.label.posy = this.cover.height - this.cover.draw.margin.bottom + this.cover.label.margin;

  //Initialize the height for the line
  //this.cover.hover.height = this.cover.draw.height;
};

//Clear the background
jviz.modules.coverviewer.prototype.backgroundClear = function()
{
  //Get the canvas layer
  var canvas = this._canvas.layer(this._bg.layer);

  //Clear the layer
  canvas.Clear();
};
