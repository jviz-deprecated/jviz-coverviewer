//Coverviewer module
jviz.modules.coverviewer = function(opt)
{
  //Check the options
  if(typeof opt !== 'object'){ var opt = {}; }

  //Save the ideogram ID
  this._id = (typeof opt.id === 'undefined') ? jviz.utils.getID({ prefix: 'coverviewer', length: 5 }) : opt.id;

  //Save the ideogram class
  this._class = (typeof opt.class === 'undefined') ? 'jviz-modules-coverviewer' : opt.class;

  //Parent element
  this._parent = opt.parent;

  //Number of layers
  this._layers = 5;

  //Title
  this._title = 'CoverViewer';

  //Detail
  this._detail = '';

  //Loading
  this._loading = false;

  //Margins
  this._margins = { top: 10, bottom: 30, left: 40, right: 40 };

  //Default layout width
  this._width = (typeof opt.width !== 'undefined') ? opt.width : '100%';

  //Default canvas height
  this._height = (typeof opt.height !== 'undefined') ? opt.height : 200;

  //Build the element
  jviz.dom.append(this._parent, { _tag: 'div', id: this._id, class: this._class });

  //Build the panel
  this._panel = new jviz.components.panel({ id: this._id + '-panel', parent: this._id, title: this._title, detail: this._detail, showFoot: false });

  //Build the canvas layers
  this._canvas = new jviz.components.canvas({ id: this._id + '-canvas', parent: this._panel.body().id, layers: this._layers, width: this._width, height: this._height, margin: this._margins });

  //Data
  this._data = {};
  this._data.has = false; //Has data
  this._data.chromosome = ''; //Data chromosome
  this._data.start = 0; //Data start position
  this._data.end = 0; //Data end position
  this._data.values = {}; //Data values
  this._data.normalized = {}; //Normalized data values
  this._data.min = 0; //Cover data min value
  this._data.max = 0; //Cover data max value

  //Samples object
  this._samples = {};
  this._samples.count = 0; //Count the number of samples
  this._samples.names = []; //Samples names
  this._samples.active = []; //Samples active
  this._samples.empty = []; //Samples empty array
  this._samples.layer = 3; //Samples layer

  //Samples line
  this._samples.line = {};
  this._samples.line.opacity = 1.0; //Samples lines opacity
  this._samples.line.width = 2; //Samples lines width
  this._samples.line.join = 'round'; //Background lines join

  //Background samples
  this._bg = {};
  this._bg.layer = 1; //Background layer
  this._bg.color = jviz.colors.navy.hex; //Background lines color
  this._bg.opacity = 0; //Background lines opacity
  this._bg.width = 2; //Background lines stroke width
  this._bg.join = 'round'; //Background lines join

  //Points definition
  this._points = {};
  this._points.layer = 2; //Points layer
  this._points.gap = 1000; //Control points nucleotides gap
  this._points.letter = 'K'; //Control points letter
  this._points.margin = 30; //Points margin

  //Points line
  this._points.line = {};
  this._points.line.color = jviz.colors.navy3.hex; //Points line color
  this._points.line.width = 1; //Points line width
  this._points.line.opacity = 0.4; //Points line opacity

  //Points text
  this._points.text = {};
  this._points.text.font = jviz.font.normal; //Points Text font
  this._points.text.size = '12px'; //Points text size
  this._points.text.color = jviz.colors.navy3.hex; //Points text color
  this._points.text.margin = { top: 15, left: 4 }; //Points text margin

  //Marks
  this._marks = {};
  this._marks.layer = 0; //Marks layer

  //Label
  this._label = {};
  this._label.layer = 4; //Label layer
  this._label.width = 90; //Label width
  this._label.height = 20; //Label height
  this._label.posx = 0; //Position x
  this._label.posy = 0; //Position y
  this._label.margin = 5; //Label margin top

  //Label rectangle
  this._label.rect = {};
  this._label.rect.color = jviz.colors.blue3.hex; //Fill color
  this._label.rect.radius = 5; //Label rectangle radius

  //Label text
  this._label.text = {};
  this._label.text.font = jviz.font.normal; //Label text font
  this._label.text.size = '11px'; //Label text size
  this._label.text.align = 'center'; //Label text align
  this._label.text.color = jviz.colors.white.hex; //Label text color

  //Draw object
  this._draw = {};
  this._draw.start = 0; //Draw start position
  this._draw.end = 0; //Draw end positon
  this._draw.length = 0; //Draw length
  this._draw.height = 0 //Draw zone height
  this._draw.move = false; //Draw on move
  this._draw.position = 0; //Draw over position

  //Draw click
  this._draw.click = {};
  this._draw.click.first = false; //Prevent errors
  this._draw.click.point = 0//Click point
  this._draw.click.start = 0; //Click orginal position
  this._draw.click.value = 0; //Click value

  //Colors
  this._colors = [];

  //Add the colors
  this._colors = this._colors.concat(jviz.colors.get(2, [ 'navy', 'grey', 'white' ]));
  this._colors = this._colors.concat(jviz.colors.get(1, [ 'navy', 'grey', 'white' ]));

  //Call the events factory
  jviz.factory.events(this);

  //Register the resize event
  this.resizeEvent();

  //Register the mouse action events
  this.mouseEvent();

  //Parse the samples
  if(typeof opt.samples !== 'undefined'){ this.samples(opt.samples); }

  //Parse the data
  (typeof opt.ajax === 'undefined') ? this.data(opt.data) : this.ajax(opt.ajax);

  //Return this
  return this;
};
