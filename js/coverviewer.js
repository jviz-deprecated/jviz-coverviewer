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
  this._samples.color = []; //Samples colors
  this._samples.empty = []; //Samples empty array
  this._samples.layer = 3; //Samples layer
  this._samples.default = jviz.colors.navy3.hex; //Samples default color

  //Samples active
  this._samples.active = {};
  this._samples.active.list = []; //Samples active list
  this._samples.active.index = []; //Samples active index

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
  this._points.margin = 35; //Points margin

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
  this._label.margin = 7; //Label margin top

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

  //Label line
  this._label.line = {};
  this._label.line.width = 1; // Line width
  this._label.line.height = 0; //Line height
  this._label.line.color = jviz.colors.blue3.hex; //Fill color
  this._label.line.opacity = 0.4; //Label line opacity

  //Label circle
  this._label.circle = {};
  this._label.circle.radius = 3; //Circle radius
  this._label.circle.opacity = 0.9; //Circle opacity

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
  this._colors.push(jviz.colors.red2.hex); //Red color
  this._colors.push(jviz.colors.blue2.hex); //Blue color
  this._colors.push(jviz.colors.pink2.hex); //Pink color
  this._colors.push(jviz.colors.green2.hex); //Green color
  this._colors.push(jviz.colors.water2.hex); //Water color
  this._colors.push(jviz.colors.orange2.hex); //Orange color
  this._colors.push(jviz.colors.purple2.hex); //Purple color

  //Menu
  this._menu = {};
  this._menu.id = this._id + '-menu'; //Menu ID
  this._menu.class = this._panel.el(); //Menu class styles

  //Samples button
  this._menu.samples = {};
  this._menu.samples.id = this._menu.id + '-samples'; //Samples button ID
  this._menu.samples.class = this._menu.class.btn.water; //Samples button class
  this._menu.samples.text = 'Show/Hide samples'; //Samples button text

  //Samples table
  this._table = {};
  this._table.id = this._id + '-table'; //Samples table id
  this._table.class = this._class + '-table'; //Samples table class
  this._table.active = false; //Samples table active

  //Table scroll
  this._table.scroll = null;

  //Table row
  this._table.row = {};
  this._table.row.id = this._table.id + '-row'; //Table row ID
  this._table.row.class = this._table.class + '-row'; //Table row class
  this._table.row.cells = 3; //Number of cells for each row

  //Table cell
  this._table.cell = {};
  this._table.cell.id = this._table.id + '-cell'; //Table cell ID
  this._table.cell.class = this._table.class + '-cell'; //Table cell class
  this._table.cell.size = 50 + 10; //Table cell size

  //Table cell switch
  this._table.cell.switch = {};
  this._table.cell.switch.id = this._table.cell.id + '-switch'; //Table cell switch ID
  this._table.cell.switch.class = this._table.cell.class + '-switch'; //Table cell switch class
  this._table.cell.switch.el = []; //Switch elements list

  //table cell text
  this._table.cell.text = {};
  this._table.cell.text.id = this._table.cell.id + '-text'; //Table cell text ID
  this._table.cell.text.class = this._table.cell.class + '-text'; //Table cell text class

  //Build the events
  this._events = new jviz.events();

  //Build module
  this.build();

  //Build the menu
  this.menu();

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

//On method
jviz.modules.coverviewer.prototype.on = function(name, listener){ return this._events.add(name, listener); };
