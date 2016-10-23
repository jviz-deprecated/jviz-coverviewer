//Import data
jviz.modules.coverviewer.prototype.data = function(data)
{
  //Check the data
  if(typeof data !== 'object'){ return this._data.values; }

  //Check the chromosome
  if(typeof data.chromosome === 'undefined'){ return jviz.console.error('Undefined data chromosome'); }

  //Check the start position
  if(typeof data.start === 'undefined'){ return jviz.console.error('Undefined data start position'); }

  //Check the end position
  if(typeof data.end === 'undefined'){ return jviz.console.error('Undefined data end position'); }

  //Check the values
  if(typeof data.values === 'undefined'){ return jviz.console.error('Undefined data values'); }

  //Set loading as true
  this.loading(true);

  //Save the chromosome
  this._data.chromosome = data.chromosome;

  //Save the start position
  this._data.start = parseInt(data.start);

  //Save the end position
  this._data.end = parseInt(data.end);

  //Save the values
  this._data.values = data.values;

  //Set has data as true
  this._data.has = true;

  //Parse the data values
  this.dataParse();

  //Initialize the draw start position
  this._draw.start = this._data.start;

  //Get the start point
  var point_start = jviz.math.format(this._data.start, '.');

  //Get the end point
  var point_end = jviz.math.format(this._data.end, '.');

  //Update the panel detail
  this._panel.detail('<b>Chromosome ' + this._data.chromosome + '</b> &nbsp; ' + point_start + ' - ' + point_end);

  //Draw the data
  this.draw();

  //Set loading as false
  this.loading(false);
};

//CoverViewer parse the data
jviz.modules.coverviewer.prototype.dataParse = function()
{
  //Reset the min value
  this._data.min = 99999999;

  //Reset the max value
  this._data.max = 0;

  //Read the values
  for(var key in this._data.values)
  {
    //Get the cover values
    var cover = this._data.values[key];

    //Get the min value
    //Math.min(jviz.array.min(cover), this._data.min);

    //Get the max value
    //Math.max(jviz.array.max(cover), this._data.max);

    //Get the cover min value
    var cover_min = jviz.array.min(cover);

    //Compare
    if(cover_min < this._data.min){ this._data.min = cover_min; }

    //Get the cover max value
    var cover_max = jviz.array.max(cover);

    //Compare the values
    if(this._data.max < cover_max){ this._data.max = cover_max; }
  }

  //Check 0 value in max
  this._data.max = Math.max(1, this._data.max)

  //Check 0 value in min
  this._data.min = Math.max(1, this._data.min);

  //Reset the normalized data values
  this._data.normalized = {};

  //Transform the original data to a new data
  for(var key in this._data.values)
  {
    //Initialize the normalized position
    this._data.normalized[key] = [];

    //Get all the coverages
    for(var j = 0; j < this._data.values[key].length; j++)
    {
      //Calculate the new height
      var h = this._data.values[key][j]/this._data.max;

      //Save the value
      this._data.normalized[key][j] = Math.floor(h * this._draw.height);
    }
  }

  //Continue
  return;
};
