//Set/enable the loading
jviz.modules.coverviewer.prototype.loading = function(value)
{
  //Check the value
  if(typeof value !== 'boolean'){ return this._loading; }

  //Check the value
  (value === true) ? this._panel.el.showLoading() : this._panel.el.hideLoading();

  //Save the value
  this._loading = value;

  //Return this
  return this;
};

//Show loading
jviz.modules.coverviewer.prototype.showLoading = function(){ return this.loading(true); };

//Hide loading
jviz.modules.coverviewer.prototype.hideLoading = function(){ return this.loading(false); };

//Check if is loading
jviz.modules.coverviewer.prototype.isLoading = function(){ return this._loading; };
