//Build the menu
jviz.modules.coverviewer.prototype.menu = function()
{
  //Get the menu container id
  //var id = this._panel.head().content.id;

  //Reset the menu content
  //jviz.dom.empty(id);

  //Add the samples button
  //jviz.dom.append(id, { id: this._menu.samples.id, class: this._menu.samples.class, _html: this._menu.samples.text });

  //Add the samples button
  this._panel.addBtn(this._menu.samples);

  //Save this
  var self = this;

  //Add the preview button icon event
  jviz.dom.event(this._menu.samples.id, 'click', function(e){ return self.menuClickSamples(); });
};

//Click on the samples button
jviz.modules.coverviewer.prototype.menuClickSamples = function()
{
  //Emit the event
  this._events.emit('btn:samples');

  //Show/Hide the samples table
  this.table();
};
