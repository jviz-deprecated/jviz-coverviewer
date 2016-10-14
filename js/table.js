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
  //Check if table exists
  if(this._table.build === true){ return; }

  //Create the table container
  jviz.dom.append(this._panel.body().id, { id: this._table.id, class: this._table.class });

  //Hide the table
  jviz.dom.style(this._table.id, 'display', 'none');

  //Set table build
  this._table.build = true;
};

//Build the table samples
jviz.modules.coverviewer.prototype.tableBuildSamples = function()
{
  //Reset the table content
  jviz.dom.html(this._table.id, '');

  //Read all the samples
  for(var i = 0; i < this._samples.count; i++)
  {
    //Get the sample name
    var sample_name = this._samples.names[i];

    //Check if sample is active
    var sample_active = this._samples.active.list[i];

    //Get the sample index
    var sample_index = this._samples.active.index.indexOf(i);

    //Get the sample color
    var sample_color = (sample_index === -1) ? this._samples.default : this._colors[sample_index];

    //Get the cell id
    var cell_id = this._table.cell.id + i;

    //Get the cell switch ID
    var cell_

    //Add the cell
    jviz.dom.append(this._table.id, { id: cell_id, class: this._table.cell.class });

    //
  }
};
