//Coverviewer module
jviz.modules.coverviewer = function(opt)
{
  //Check the options
  if(typeof opt !== 'object'){ var opt = {}; }

  //Save the ideogram ID
  this._id = (typeof opt.id === 'undefined') ? jviz.utils.getID({ prefix: 'coverviwer', length: 5 }) : opt.id;

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

  //Return this
  return this;
};
