//Coverviewer build
jviz.modules.coverviewer.prototype.build = function()
{
  //Build the element
  jviz.dom.append(this._parent, { id: this._id, class: this._class });

  //Build the panel element
  this._panel.el = new jviz.components.panel(this._panel);

  //Set the panel title
  this._panel.el.title(this._title);

  //Add the canvas parent object
  this._canvas.parent = this._panel.el.body();

  //Build the canvas layer
  this._canvas.el = new jviz.components.canvas(this._canvas);

  //Create the table container
  jviz.dom.append(this._panel.el.body(), { id: this._table.id, class: this._table.class });

  //Hide the table
  jviz.dom.style(this._table.id, 'display', 'none');

  //Add the scroll event
  this._table.scroll = new jviz.commons.scrollBlock({ id: this._table.id, num: 1, size: this._table.cell.size });

  //Continue
  return this;
};
