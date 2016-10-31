//Set the marks
jviz.modules.coverviewer.prototype.marks = function(data)
{
  //Check the data
  if(typeof data === 'undefined'){ return this._marks.src; }

  //Check for array
  if(jviz.is.array(data) === false){ data = [ data ]; }

  //Parse the marks
  this._marks.src = this.marksParse(data);

  //Draw the marks
  this.draw({ background: false });

  //Return this
  return this;
};

//Parse the marks data
jviz.modules.coverviewer.prototype.marksParse = function(data)
{
  //Output list
  var list = [];

  //Read all the data values
  data.forEach(function(el)
  {
    //Check the start position
    if(typeof el.start === 'undefined'){ return true; }

    //Check the end position
    if(typeof el.end === 'undefined'){ return true; }

    //Parse the start position
    el.start = parseInt(el.start);

    //Parse the end position
    el.end = parseInt(el.end);

    //Save to the list
    list.push(el);

    //Continue
    return true;
  });

  //Return the parsed list
  return list;
};

//Draw the marks
jviz.modules.coverviewer.prototype.marksDraw = function()
{
  //Get the draw zone
  var draw = this._canvas.draw();

  //Get the canvas layer
  var canvas = this._canvas.layer(this._marks.layer);

  //Clear the layer
  canvas.Clear();

  //Check if has data
  if(this._data.has === false){ return this; }

  //Read all the marks
  for(var i = 0; i < this._marks.src.length; i++)
  {
    //Get the mark
    var mark = this._marks.src[i];

    //Check the mark start and end position
    if(mark.end < this._draw.region.start || this._draw.region.end < mark.start){ continue; }

    //Get the start position
    var mark_start = Math.max(0, (mark.start - this._draw.region.start));

    //Get the end point
    var mark_end = Math.min(this._draw.width, (mark.end - this._draw.region.start));

    //Get the mark length
    var mark_length = Math.max(1, mark_end - mark_start);

    //Get the start position x
    var mark_x = draw.margin.left + mark_start;

    //Get the mark position y
    var mark_y = draw.margin.top;

    //Get the mark height
    var mark_height = this._draw.height;

    //Draw the mark rectangle
    canvas.Rect({ x: mark_x, y: mark_y, width: mark_length, height: mark_height });

    //Draw the color
    canvas.Fill({ color: this._marks.color, opacity: this._marks.opacity });
  }

  //Return this
  return this;
};

//Clear the marks
jviz.modules.coverviewer.prototype.marksClear = function()
{
  //Get the canvas layer and clear it
  this._canvas.layer(this._marks.layer).Clear();

  //Return this
  return this;
};

//Reset the marks
jviz.modules.coverviewer.prototype.marksReset = function()
{
  //Reset the marks data
  this._marks.src = [];

  //Clear the marks layer
  this.marksClear();
};
