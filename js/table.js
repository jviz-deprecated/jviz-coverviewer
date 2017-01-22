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
  //Reset the table content
  jviz.dom.html(this._table.id, '');

  //Check the samples count
  if(this._samples.count === 0){ return; }

  //Count the number of lines
  var lines = this.tableLines();

  //Add the number of lines
  this._table.scroll.number(lines);

  //Read all the samples
  for(var i = 0; i < this._samples.count; i++)
  {
    //Get the row ID
    var row_id = this._table.row.id + Math.floor(i / this._table.row.cells).toString();

    //Check the index
    if(i % this._table.row.cells === 0)
    {
      //Get the row class
      var row_class = this._table.row.class;

      //Append the row
      jviz.dom.append(this._table.id, { id: row_id, class: row_class });
    }

    //Add the sample
    this.tableSampleAdd(i, row_id);
  }
};

//Count the number of lines
jviz.modules.coverviewer.prototype.tableLines = function()
{
  //Get the number of samples
  var count = this._samples.count;

  //Get the number of cells for each row
  var cells = this._table.row.cells

  //Return the number of lines
  return (count % cells === 0) ? count / cells : Math.floor(count / cells) + 1;
};

//Add a new sample to the table
jviz.modules.coverviewer.prototype.tableSampleAdd = function(index, parent)
{
  //Save this
  var self = this;

  //Get the sample name
  var sample_name = this._samples.names[index];

  //Check if sample is active
  var sample_active = this._samples.active.list[index];

  //Get the sample index
  var sample_index = this._samples.active.index.indexOf(index);

  //Get the sample color
  var sample_color = (sample_index === -1) ? this._samples.default : this._colors[sample_index];

  //Get the cell id
  var cell_id = this._table.cell.id + index;

  //Get the cell class
  var cell_class = this._table.cell.class;

  //Add the cell
  jviz.dom.append(parent, { id: cell_id, class: cell_class });

  //Add the cell text
  jviz.dom.html(cell_id, sample_name);

  //Add the cell click event
  jviz.dom.on(cell_id, 'click', function(){ self.tableSampleToggle(index); });

  //Add the color
  jviz.dom.style(text_id, 'color', this._samples.color[index]);

  //Exit
  return this;
};

//Show the sample
jviz.modules.coverviewer.prototype.tableSampleToggle = function(index)
{
  //Check if sample is active
  var is_active = this.isSample(index);

  //Hide or show the sample
  (is_active === true) ? this.hideSample(index) : this.showSample(index);

  //Get the background color
  var color = (is_active === true) ? '' : this._samples.color[index];

  //Get the sample text id
  var id = this._table.cell.id + index;

  //Update the sample color
  jviz.dom.style(id, 'background-color', color);
};
