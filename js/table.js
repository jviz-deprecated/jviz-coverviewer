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
  if(this._table.build === false)
  {
    //Create the table container
    jviz.dom.append(this._panel.body().id, { id: this._table.id, class: this._table.class });

    //Hide the table
    jviz.dom.style(this._table.id, 'display', 'none');

    //Set table build
    this._table.build = true;
  }

  //Reset the table content
  jviz.dom.html(this._table.id, '');

  //Reset the switch elements list
  this._table.cell.switch.el = [];

  //Check the samples count
  if(this._samples.count === 0){ return; }

  //Read all the samples
  for(var i = 0; i < this._samples.count; i++)
  {
    //Add the sample
    this.tableSampleAdd(i);
  }
};

//Add a new sample to the table
jviz.modules.coverviewer.prototype.tableSampleAdd = function(index)
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
  jviz.dom.append(this._table.id, { id: cell_id, class: cell_class });

  //Get the switch ID
  var switch_id = this._table.cell.switch.id + index;

  //Build the switch element
  var switch_el = new jviz.components.switch({ id: switch_id, parent: cell_id });

  //Add the switch event
  switch_el.on('change', function(value){ self.tableSampleToggle(index, value); });

  //Save the switch element
  //this._table.cell.switch.el.push(switch_el);

  //Get the text id
  var text_id = this._table.cell.text.id + index;

  //Get the text class
  var text_class = this._table.cell.text.class;

  //Add the sample name
  jviz.dom.append(cell_id, { _tag: 'span', id: text_id, class: text_class, _html: sample_name });

  //Add the color
  jviz.dom.style(text_id, 'color', this._samples.color[index]);
};

//Show the sample
jviz.modules.coverviewer.prototype.tableSampleToggle = function(index, value)
{
  //Check the value
  (value === true) ? this.showSample(index) : this.hideSample(index);

  //Get the sample text id
  var id = this._table.cell.text.id + index;

  //Update the sample color
  jviz.dom.style(id, 'color', this._samples.color[index]);
};
