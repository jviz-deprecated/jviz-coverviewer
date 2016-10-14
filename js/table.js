//Show/Hide the samples table
jviz.modules.coverviewer.prototype.table = function()
{
  //Show/hide the table
  return (this._table.active === false) ? this.showTable() : this.hideTable();
};

//Show the table
jviz.modules.coverviewer.prototype.showTable = function()
{
  //Set active table as true
  this._table.active = true;

  //Show the table
  jviz.dom.style(this._table.id, 'display', 'block');
};

//Hide the table
jviz.modules.coverviewer.prototype.hideTable = function()
{
  //Set active table as false
  this._table.active = false;

  //Hide the table
  jviz.dom.style(this._table.id, 'display', 'none');
};

//Build the table
jviz.modules.coverviewer.prototype.tableBuild = function()
{
  //Create the table container
  jviz.dom.append(this._panel.body().id, { id: this._table.id, class: this._table.class, _html: 'Table' });

  //Hide the table
  jviz.dom.style(this._table.id, 'display', 'none');
};
