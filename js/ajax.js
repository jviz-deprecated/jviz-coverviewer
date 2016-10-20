//Get the data from ajax
jviz.modules.coverviewer.prototype.ajax = function(opt)
{
  //Check the options
  if(typeof opt === 'undefined'){ return this; }

  //Check the url
  if(typeof opt.url === 'undefined'){ return this; }

  //Check the method
  if(typeof opt.method === 'undefined'){ opt.method = 'GET'; }

  //Check the json format
  if(typeof opt.json !== 'boolean'){ opt.json = false; }

  //Save this
  var self = this;

  //Get the data
  var request = $.ajax({ url: opt.url, method: opt.method, dataType: 'json' });

  //Done function
  request.done(function(data)
  {
    //Parse the data
    if(typeof opt.parse === 'function'){ data = opt.parse(data); }

    //Save the regions
    self.data(data);
  });

  //Error function
  request.error(function(){ console.error('Error getting coverage data'); });
};
