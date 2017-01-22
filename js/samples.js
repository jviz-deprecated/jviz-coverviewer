//Manage the samples
jviz.modules.coverviewer.prototype.samples = function(data)
{
  //Check the data object
  if(typeof data === 'undefined'){ return this._samples.names; }

  //Check for array
  if(jviz.is.array(data) === false){ data = [ data ]; }

  //Save the names
  this._samples.names = data;

  //Count the number of samples
  this._samples.count = data.length;

  //Initialize the active samples list
  this._samples.active.list = jviz.array.create(data.length, false);

  //Initialize the active samples index
  this._samples.active.index = [];

  //Initialize the samples empty array
  this._samples.empty = jviz.array.zeros(data.length);

  //Initialize the colors array
  this._samples.color = jviz.array.create(data.length, this._samples.default);

  //Calulate the background lines opacity
  this._bg.opacity = (this._samples.count === 0) ? 0 : 1 / this._samples.count;

  //Build the table samples
  this.tableBuild();

  //Return this
  return this;
};

//Draw the samples
jviz.modules.coverviewer.prototype.samplesDraw = function()
{
  //Check the active samples count
  if(this._samples.active.index.length === 0){ return; }

  //Get the draw zone
  var draw = this._canvas.el.draw();

  //Get the canvas layer
  var canvas = this._canvas.el.layer(this._samples.layer);

  //Clear the layer
  canvas.Clear();

  //Lines array
  var lines = [];

  //Initialize the array
  for(var j = 0; j < this._samples.active.index.length; j++){ lines[j] = []; }

  //Real position counter
  var p = draw.margin.left;

  //Read all the positions
  for(var i = 0; i < this._draw.width; i++)
  {
    //Get the position
    var pos = Math.floor(this._draw.start + i / this._zoom.value);

    //Get the cover array
    var cover = (typeof this._cover.values[pos] === 'undefined') ? this._samples.empty : this._cover.values[pos];

    //Draw the lines
    for(var j = 0; j < this._samples.active.index.length; j++)
    {
      //Get the index
      var index = this._samples.active.index[j];

      //Calculate the y position
      var py = this._height - draw.margin.bottom - cover[index];

      //Push
      lines[j].push([p, py]);
    }

    //Increment the counter
    p = p + 1;
  }

  //Draw all the lines
  for(var j = 0; j < this._samples.active.index.length; j++)
  {
    //Get the index
    var index = this._samples.active.index[j];

    //Draw the line
    canvas.Line(lines[j]);

    //Set the line style
    canvas.Stroke({ width: this._samples.line.width, color: this._samples.color[index] });
  }

  //Return this
  return this;
};

//Clear the samples layer
jviz.modules.coverviewer.prototype.samplesClear = function()
{
  //Clear the samples layer
  this._canvas.el.layer(this._samples.layer).Clear();

  //Return this
  return this;
};

//Display a sample
jviz.modules.coverviewer.prototype.showSample = function(index)
{
  //Check the index value
  if(index < 0 || this._samples.count <= index){ return jviz.console.error('Invalid sample index'); }

  //Check if sample is active now
  if(this._samples.active.list[index] === true){ return; }

  //Activate the sample
  this._samples.active.list[index] = true;

  //Save the sample index
  this._samples.active.index.push(index);

  //Update the color
  this._samples.color[index] = this.samplesColor();

  //Draw the samples
  this.samplesDraw();
};

//Hide a sample
jviz.modules.coverviewer.prototype.hideSample = function(index)
{
  //Check the index value
  if(index < 0 || this._samples.count <= index){ return jviz.console.error('Invalid sample index'); }

  //Desactivate the sample
  this._samples.active.list[index] = false;

  //Remove the index
  this._samples.active.index = jviz.array.remove(this._samples.active.index, index);

  //Reset the sample color
  this._samples.color[index] = this._samples.default;

  //Clear the samples
  this.samplesClear();

  //Draw the samples
  this.samplesDraw();
};

//Check if sample is active
jviz.modules.coverviewer.prototype.isSample = function(n)
{
  //Get the index
  var index = this._samples.active.index.indexOf(n);

  //Return if sample is active
  return (index === -1) ? false : true;
};

//Get a color for a new sample
jviz.modules.coverviewer.prototype.samplesColor = function()
{
  //Read all the colors
  for(var i = 0; i < this._colors.length; i++)
  {
    //Get the color
    var color = this._colors[i];

    //Check if color exists
    if(this._samples.color.indexOf(color) === -1){ return color; }
  }

  //Return the first color
  return this._colors[0];
};
