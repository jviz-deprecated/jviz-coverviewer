//Draw the points
jviz.modules.coverviewer.prototype.pointsDraw = function()
{
  //Get the start point
  var pstart = Math.floor(this._draw.start / this._points.gap) + 1;

  //Get the end point
  var pend = this._draw.end / this._points.gap;

  //Get the draw zone
  var draw = this._canvas.draw();

  //Get the canvas layer
  var canvas = this._canvas.layer(this._points.layer);

  //Clear the layer
  canvas.Clear();

  //Loop
  for(var i = pstart; i <= pend; i++)
  {
    //Get the value
    var value = i * this._points.gap;

    //Line position x
    var line_x = draw.margin.left + (value - this._draw.start);

    //Line position y start
    var line_y_start = draw.margin.top;

    //Line position y end
    var line_y_end = this._draw.height + this._points.margin;

    //Generate the line
    canvas.Line([[line_x, line_y_start], [line_x, line_y_end]]);

    //Add the line style
    canvas.Stroke({ color: this._points.line.color, width: this._points.line.width, opacity: this._points.line.opacity });

    //Get the point x position
    var lt_x = line_x + this._points.text.margin.left;

    //Get the point y position
    var lt_y = line_y_end - this._points.text.margin.top;

    //Add the text value
    var lt_text = jviz.math.formatNumber(i, '.') + this._points.letter;

    //Add the text size
    var lt_size = this._points.text.size;

    //Add the text font
    var lt_font = this._points.text.font;

    //Add the text color
    var lt_color = this._points.text.color;

    //Add the text
    canvas.Text({ x: lt_x, y: lt_y, text: lt_text, color: lt_color, font: lt_font, size: lt_size });
  }
};

//Clear the points layer
jviz.modules.coverviewer.prototype.pointsClear = function()
{
  //Get the canvas layer
  var canvas = this._canvas.layer(this._points.layer);

  //Clear the layer
  canvas.Clear();
};
