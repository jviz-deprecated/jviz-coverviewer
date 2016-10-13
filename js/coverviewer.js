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
  this._layers = 4;

  //Title
  this._title = 'CoverViewer';

  //Detail
  this._detail = '';

  //Loading
  this._loading = false;

  //Margins
  this._margins = { top: 10, bottom: 20, left: 40, right: 40 };

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

  //Draw object
  this._draw = {};
  this._draw.start = 0; //Draw start position
  this._draw.end = 0; //Draw end positon
  this._draw.length = 0; //Draw length
  this._draw.move = false; //Draw on move

  //Draw the background
  this._draw.bg = {};
  this._draw.bg.layer = 1; //Background layer
  this._draw.bg.color = jviz.colors.navy; //Background lines color
  this._draw.bg.opacity = 0; //Background lines opacity
  this._draw.bg.stroke = 2; //Background lines stroke

  //Draw the marks
  this._draw.marks = {};
  this._draw.marks.layer = 0; //Marks layer

  //Parse the samples
  if(typeof opt.samples !== 'undefined'){ this.samples(opt.samples); }

  //Parse the data
  (typeof opt.ajax === 'undefined') ? this.data(opt.data) : this.ajax(opt.ajax);

  //Return this
  return this;
};
