//Import data
jviz.modules.coverviewer.prototype.cover = function(data)
{
  //Check the data
  if(typeof data !== 'object')
  {
    //Check if has data
    if(this._cover.has === false){ return false; }

    //Return the actual chromosome, start and end position and the values
    return { chromosome: this._cover.chromosome, start: this._cover.start, end: this._cover.end, values: this._cover.values };
  }

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
  this._cover.chromosome = data.chromosome;

  //Save the start position
  this._cover.start = parseInt(data.start);

  //Save the end position
  this._cover.end = parseInt(data.end);

  //Calculate the data length
  this._cover.length = Math.abs(this._cover.end - this._cover.start) + 1;

  //Save the values
  this._cover.values = this.coverParse(data.values);

  //Set has data as true
  this._cover.has = true;

  //Initialize the region draw start position
  this._draw.start = this._cover.start;

  //Get the start point
  var point_start = jviz.math.format(this._cover.start, '.');

  //Get the end point
  var point_end = jviz.math.format(this._cover.end, '.');

  //Update the panel detail
  this._panel.el.detail('<b>Chromosome ' + this._cover.chromosome + '</b>&nbsp;' + point_start + ' - ' + point_end);

  //Update the zoom values
  this.zoomUpdate();

  //Draw the data
  this.draw();

  //Set loading as false
  this.loading(false);

  //Return this
  return this;
};

//CoverViewer parse the coverage data
jviz.modules.coverviewer.prototype.coverParse = function(values)
{
  //Reset the min value
  this._cover.min = 99999999;

  //Reset the max value
  this._cover.max = 0;

  //Read the values
  for(var key in values)
  {
    //Get the cover min value
    var cover_min = jviz.array.min(values[key]);

    //Compare
    if(cover_min < this._cover.min){ this._cover.min = cover_min; }

    //Get the cover max value
    var cover_max = jviz.array.max(values[key]);

    //Compare the values
    if(this._cover.max < cover_max){ this._cover.max = cover_max; }
  }

  //Check 0 value in max
  this._cover.max = Math.max(1, this._cover.max)

  //Check 0 value in min
  this._cover.min = Math.max(1, this._cover.min);

  //Initialize the output cover values
  var out = {};

  //Transform the original data to a new data
  for(var key in values)
  {
    //Initialize the normalized position
    out[key] = [];

    //Get all the coverages
    for(var j = 0; j < values[key].length; j++)
    {
      //Save the value
      out[key][j] = values[key][j] * this._draw.height / this._cover.max;
    }
  }

  //Return the coverage values
  return out;
};

//Draw the coverage values
jviz.modules.coverviewer.prototype.coverDraw = function()
{

};
