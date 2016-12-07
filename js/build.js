//Coverviewer build
jviz.modules.coverviewer.prototype.build = function()
{
  //Create the table container
  jviz.dom.append(this._panel.body(), { id: this._table.id, class: this._table.class });

  //Hide the table
  jviz.dom.style(this._table.id, 'display', 'none');

  //Add the scroll event
  this._table.scroll = new jviz.commons.scrollBlock({ id: this._table.id, num: 1, size: this._table.cell.size });
};
