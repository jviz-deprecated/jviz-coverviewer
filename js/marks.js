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

    //Get the mark label x
    var mark_label_x = draw.margin.left + ( mark_end + mark_start ) / 2 - this._marks.label.width / 2;

    //Get the mark label y
    var mark_label_y = draw.margin.top - this._marks.label.height - this._marks.label.triangle;

    //Get the mark label width
    var mark_label_width = this._marks.label.width;

    //Get the mark label height
    var mark_label_height = this._marks.label.height;

    //Get the mark label radius
    var mark_label_radius = this._marks.label.radius;

    //Draw the mark position rectangle
    canvas.Rect({ x: mark_label_x, y: mark_label_y, width: mark_label_width, height: mark_label_height, radius: mark_label_radius });

    //Fill color
    canvas.Fill({ color: this._marks.label.color, opacity: this._marks.label.opacity });

    //Create the triangle
    var mark_tri = [];

    //Get the triangle position x
    var mark_tri_x = mark_label_x + this._marks.label.width / 2;

    //Get the triangle position y
    var mark_tri_y = mark_label_y + this._marks.label.height;

    //Add the first point
    mark_tri.push([ mark_tri_x - this._marks.label.triangle, mark_tri_y ]);

    //Add the middle point
    mark_tri.push([ mark_tri_x, mark_tri_y + this._marks.label.triangle ]);

    //Add the last point
    mark_tri.push([ mark_tri_x + this._marks.label.triangle, mark_tri_y ]);

    //Draw the triangle
    canvas.Line(mark_tri);

    //Fill color
    canvas.Fill({ color: this._marks.label.fill });

    //Get the text
    var mark_text = jviz.math.format(mark.start) + ' - ' + jviz.math.format(mark.end);

    //Get the text position x
    var mark_text_x = mark_label_x + this._marks.label.width / 2;

    //Get the text position y
    var mark_text_y = mark_label_y + this._marks.label.text.margin;

    //Get the text font
    var mark_text_font = this._marks.label.text.font;

    //Get the text size
    var mark_text_size = this._marks.label.text.size;

    //Get the text color
    var mark_text_color = this._marks.label.text.color;

    //Get the text align
    var mark_text_align = this._marks.label.text.align;

    //Draw the text
    canvas.Text({ text: mark_text, x: mark_text_x, y: mark_text_y, color: mark_text_color, font: mark_text_font, size: mark_text_size, align: mark_text_align });
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
