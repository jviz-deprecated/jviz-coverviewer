//Coverviewer module
jviz.modules.coverviewer = function(opt)
{
  //Check the options
  if(typeof opt !== 'object'){ var opt = {}; }

  //Save the ideogram ID
  this._id = (typeof opt.id === 'undefined') ? jviz.misc.getID({ prefix: 'coverviewer', length: 5 }) : opt.id;

  //Save the ideogram class
  this._class = (typeof opt.class === 'undefined') ? 'jviz-modules-coverviewer' : opt.class;

  //Parent element
  this._parent = opt.parent;

  //Title
  this._title = (typeof opt.title === 'string') ? opt.title : 'CoverViewer';

  //Detail
  this._detail = '';

  //Loading
  this._loading = false;

  //Default layout width
  this._width = (typeof opt.width !== 'undefined') ? opt.width : '100%';

  //Default canvas height
  this._height = (typeof opt.height !== 'undefined') ? opt.height : 200;

  //Panel
  this._panel = {};
  this._panel.id = this._id + '-panel'; //Panel ID
  this._panel.parent = this._id; //Panel parent ID
  this._panel.showFoot = false; //Show foot
  this._panel.el = null; //Panel element

  //Canvas
  this._canvas = {};
  this._canvas.id = this._id + '-canvas'; //Canvas ID
  this._canvas.parent = this._id; //Canvas parent element
  this._canvas.layers = 7; //Number of canvas layers
  this._canvas.width = this._width; //Canvas width
  this._canvas.height = this._height; //Canvas height
  this._canvas.margin = { top: 30, bottom: 30, left: 40, right: 40 };
  this._canvas.el = null; //Canvas element

  //Coverage data
  this._cover = {};
  this._cover.has = false; //Has data
  this._cover.chromosome = ''; //Data chromosome
  this._cover.start = 0; //Data start position
  this._cover.end = 0; //Data end position
  this._cover.length = 0; //Coverage data length
  this._cover.values = {}; //Data values
  this._cover.normalized = {}; //Normalized data values
  this._cover.min = 0; //Cover data min value
  this._cover.max = 0; //Cover data max value

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
  this._bg.draw = true; //Draw the background
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
  this._points.margin = 45; //Points margin

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
  this._points.text.margin = { top: 12, left: 4 }; //Points text margin

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
  this._draw.width = 0; //Draw width
  this._draw.height = 0 //Draw zone height
  this._draw.move = false; //Draw on move
  this._draw.position = 0; //Draw over position
  this._draw.start = 0; //Region start point
  this._draw.end = 0; //Region end point
  this._draw.length = 0; //Region length
  this._draw.margin = 0; //Draw margin left

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
  this._colors.push(jviz.colors.teal2.hex); //Teal color
  this._colors.push(jviz.colors.orange2.hex); //Orange color
  this._colors.push(jviz.colors.purple2.hex); //Purple color

  //Samples table
  this._table = {};
  this._table.id = this._id + '-table'; //Samples table id
  this._table.class = this._class + '-table'; //Samples table class
  this._table.active = false; //Samples table active
  this._table.scroll = null; //Table scroll element

  //Table row
  this._table.row = {};
  this._table.row.id = this._table.id + '-row'; //Table row ID
  this._table.row.class = this._table.class + '-row'; //Table row class
  this._table.row.cells = 4; //Number of cells for each row

  //Table cell
  this._table.cell = {};
  this._table.cell.id = this._table.id + '-cell'; //Table cell ID
  this._table.cell.class = this._table.class + '-cell'; //Table cell class
  this._table.cell.size = 40 + 10; //Table cell size

  //Marks
  this._marks = {};
  this._marks.src = []; //Marks source data
  this._marks.layer = 5; //Marks layer
  this._marks.color = jviz.colors.purple2.hex; //Marks color
  this._marks.opacity = 0.3; //Marks opacity

  //Marks label
  this._marks.label = {};
  this._marks.label.width = 150; //Marks label width
  this._marks.label.height = 20; //Marks label height
  this._marks.label.fill = jviz.colors.purple2.hex; //Marks label fill color
  this._marks.label.triangle = 6; //Marks label triangle
  this._marks.label.radius = 5; //Marks label radius
  this._marks.label.margin = { top: 4 }; //Marks label margin top

  //Marks position text
  this._marks.label.text = {};
  this._marks.label.text.color = jviz.colors.white.hex; //Marks label text color
  this._marks.label.text.font = jviz.font.normal; //Marks label text font
  this._marks.label.text.align = 'center'; //Marks label text align
  this._marks.label.text.size = '11px'; //Marks label text size
  this._marks.label.text.margin = 3; //Marks label text margin

  //Check the zoom options
  if(typeof opt.zoom !== 'object'){ opt.zoom = {}; }

  //Zoom options
  this._zoom = {};
  this._zoom.max = 1; //Max zoom level
  this._zoom.min = 0; //Min zoom level
  this._zoom.value = 1; //Zoom value
  this._zoom.increment = 0.1; //Zoom increment
  this._zoom.default = (typeof opt.zoom.default === 'number') ? opt.zoom.default : 1; //Default zoom value
  this._zoom.fixed = (typeof opt.zoom.fixed === 'boolean') ? opt.zoom.fixed : false; //Zooming is fixed
  this._zoom.buttons = (typeof opt.zoom.buttons === 'boolean') ? opt.zoom.buttons : true; //Zoom buttons are visible

  //Check the selection options
  if(typeof opt.selection !== 'object'){ opt.selection = {}; }

  //Selection options
  this._selection = {};
  this._selection.start = -1; //Selection start position
  this._selection.end = -1; //Selection end position
  this._selection.enabled = (typeof opt.selection.enabled === 'boolean') ? opt.selection.enabled : true; //Selection is enabled
  this._selection.active = (typeof opt.selection.active === 'boolean') ? opt.selection.active : false; //Selection is active
  this._selection.layer = 6; //Selection layer num
  this._selection.color = (typeof opt.selection.color === 'string') ? opt.selection.color : jviz.colors.green2.hex; //Selection color
  this._selection.fixed = (typeof opt.selection.fixed === 'boolean') ? opt.selection.fixed : false; //Selection is fixed
  this._selection.has = false; //Has selection region

  //Selection rectanle values
  this._selection.rect = {};
  this._selection.rect.posx = 0; //Selection rectangle position x
  this._selection.rect.posy = 0; //Selection rectangle position y
  this._selection.rect.width = 0; //Selection rectangle width
  this._selection.rect.height = 0; //Selection rectangle height
  this._selection.rect.opacity = 0.3; //Selection rectangle opacity

  //Selection click
  this._selection.click = {};
  this._selection.click.active = false; //Selection click is active
  this._selection.click.original = 0; //Click original position
  this._selection.click.start = 0; //Click start point
  this._selection.click.end = 0; //Click end point
  this._selection.click.orientation = 0; //Click orientation
  this._selection.click.move = false; //Selection move is active
  this._Selection.click.type = ''; //Selection type

  //Selection button
  this._selection.btn = {};
  this._selection.btn.text = 'Selection'; //Selection button text
  this._selection.btn.enabled = (typeof opt.selection.button === 'boolean') ? opt.selection.button : true; //Selection button is active
  this._selection.btn.color = 'green'; //Selection button color
  this._selection.btn.el = null; //Button element

  //Axis
  this._axis = {};
  this._axis.active = (typeof opt.axis === 'boolean') ? opt.axis : true; //Axis are active
  this._axis.draw = false; //Axis draw
  this._axis.layer = 0; //Axis layer
  this._axis.values = []; //Axis values

  //Axis lines values
  this._axis.lines = {};
  this._axis.lines.width = 2; //Lines width
  this._axis.lines.opacity = 0.8; //Lines opacity
  this._axis.lines.color = jviz.colors.navy4.hex; //Axis color

  //Axis text values
  this._axis.text = {};
  this._axis.text.font = jviz.font.normal; //Axis Text font
  this._axis.text.size = '12px'; //Axis text size
  this._axis.text.color = jviz.colors.navy3.hex; //Axis text color
  this._axis.text.margin = { top: 8, left: 4 }; //Axis text margin
  this._axis.text.align = 'right'; //Axis text align

  //Menu
  this._menu = {};
  this._menu.id = this._id + '-menu'; //Menu ID

  //Samples button
  this._menu.samples = {};
  this._menu.samples.id = this._menu.id + '-samples'; //Samples button ID
  this._menu.samples.color = 'teal'; //Samples button color
  this._menu.samples.text = 'Show/Hide samples'; //Samples button text

  //Zoom in button
  this._menu.zoomin = {};
  this._menu.zoomin.id = this._menu.id + '-zoom-in'; //Zoom in button ID
  this._menu.zoomin.color = 'grey'; //Zoom in button color
  this._menu.zoomin.text = 'Zoom In'; //Zoom in button text

  //Zoom out button
  this._menu.zoomout = {};
  this._menu.zoomout.id = this._menu.id + '-zoom-out'; //Zoom out button ID
  this._menu.zoomout.color = 'grey'; //Zoom out button color
  this._menu.zoomout.text = 'Zoom Out'; //Zoom out button text

  //Build the events
  this._events = new jviz.commons.events();

  //Build module
  this.build();

  //Build the menu
  this.menu();

  //Register the events
  this.events();

  //Return this
  return this;
};
