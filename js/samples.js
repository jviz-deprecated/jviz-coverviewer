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

  //Initialize the active samples array
  this._samples.active = jviz.array.create(data.length, false);

  //Initialize the samples empty array
  this._samples.empty = jviz.array.zeros(data.length);

  //Calulate the background lines opacity
  this._bg.opacity = (this._samples.count === 0) ? 0 : 1 / this._samples.count;
};

//Draw the samples
jviz.modules.coverviewer.prototype.samplesDraw = function()
{

};
