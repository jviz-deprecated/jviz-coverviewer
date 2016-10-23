//Draw the label
jviz.modules.coverviewer.prototype.labelDraw = function(px, py)
{
  //Get the up layer
  var canvas = this._canvas.layer(this._label.layer);

  //Clear the canvas
  canvas.Clear();

  //Draw the label line
  this.labelLineDraw(canvas, px, py);

  //Draw the label box
  this.labelBoxDraw(canvas, px, py);

  //Draw the label circles
  this.labelCirclesDraw(canvas, px, py);
};

//Draw the label line
jviz.modules.coverviewer.prototype.labelLineDraw = function(canvas, px, py)
{
  //Get the draw
  var draw = this._canvas.draw();

  //Draw the line
  canvas.Line([[ px, draw.margin.top], [px, draw.margin.top + this._label.line.height ]]);

  //Add the style
  canvas.Stroke({ width: this._label.line.width, color: this._label.line.color, opacity: this._label.line.opacity });
};

//Draw the label box
jviz.modules.coverviewer.prototype.labelBoxDraw = function(canvas, px, py)
{
  //Save the position x
  var posx = px;

  //Save the position y
  var posy = this._label.posy;

  //Set the rectanle position x
  var rect_x = posx - this._label.width / 2;

  //Set the rectanlge width
  var rect_width = this._label.width;

  //Set the rectanlge height
  var rect_height = this._label.height;

  //Set the rectangle radius
  var rect_radius = this._label.rect.radius;

  //Draw the rectangle
  canvas.Rect({ x: rect_x, y: posy, width: rect_width, height: rect_height, radius: rect_radius });

  //Set the style
  canvas.Fill(this._label.rect.color);

  //Save the text
  var text_text = jviz.math.format(this._draw.position, '.');

  //Save the text font
  var text_font = this._label.text.font;

  //Save the text size
  var text_size = this._label.text.size;

  //Save the text align
  var text_align = this._label.text.align;

  //Save the text color
  var text_color = this._label.text.color;

  //Show the text
  canvas.Text({ text: text_text, x: posx, y: posy + 4, font: text_font, size: text_size, align: text_align, color: text_color });

  //Draw the triangle
  canvas.Polygon([[posx - 6, posy + 2],[posx, posy - 6],[posx + 6, posy + 2]]);

  //Set the style
  canvas.Fill(this._label.rect.color);
};

//Draw the label circle
jviz.modules.coverviewer.prototype.labelCirclesDraw = function(canvas, px, py)
{
  //Get the draw
  var draw = this._canvas.draw();

  //Get the actual position
  var pos = this._draw.position;

  //Get the cover for this position
  var cover = (typeof this._data.normalized[pos] === 'undefined') ? this._samples.empty : this._data.normalized[pos];

  //Create one circle for each bam file
  for(var i = 0; i < this._samples.count; i++)
  {
    //Create the new object circle
    var circ = {};

    //Calculate the position x
    circ.posx = px;

    //Calculate the position y
    circ.posy = this._height - draw.margin.bottom - cover[i];

    //Set the radius
    canvas.Circle({ x: circ.posx, y: circ.posy, radius: this._label.circle.radius });

    //Get the color
    circ.color = this._samples.color[i];

    //Add the style
    canvas.Fill({ color: circ.color, opacity: this._label.circle.opacity });
  }
};

//Clear the label
jviz.modules.coverviewer.prototype.labelClear = function()
{
  //Get the up layer
  var canvas = this._canvas.layer(this._label.layer);

  //Clear the canvas
  canvas.Clear();
};
