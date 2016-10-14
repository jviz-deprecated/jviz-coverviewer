//Build the menu
jviz.modules.coverviewer.prototype.menu = function()
{
  //Get the menu container id
  var id = this._panel.head().content.id;

  //Reset the menu content
  jviz.dom.empty(id);

  //Add the samples button
  jviz.dom.append(id, { id: this._menu.samples.id, class: this._menu.samples.class, _html: this._menu.samples.text });

  //Save this
  var self = this;

  //Add the preview button icon event
  jviz.mouse.down(this._menu.samples.id, function(e){ return self.menuClickSamples(); });
};

//Click on the samples button
jviz.modules.coverviewer.prototype.menuClickSamples = function()
{
  //Emit the event
  this.emit('btn:samples');

  //Show/Hide the samples table
  this.table();
};
