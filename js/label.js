//Draw the label
jviz.modules.coverviewer.prototype.labelDraw = function(px)
{
  //Get the up layer
  var canvas = this._canvas.layer(this._label.layer);

  //Clear the canvas
  canvas.Clear();

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
  var text_text = jviz.math.formatNumber(this._draw.position, '.');

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

//Clear the label
jviz.modules.coverviewer.prototype.labelClear = function()
{
  //Get the up layer
  var canvas = this._canvas.layer(this._label.layer);

  //Clear the canvas
  canvas.Clear();
};
