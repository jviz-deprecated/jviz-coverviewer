//Initialize the package
var pkg = {};

//Source js files
var src_js = [ './js/coverviewer.js', './js/**/*.js' ];

//Source sass files
var src_scss = [ './scss/**.scss' ];

//Package name
pkg.name = 'coverviewer';

//Description
pkg.description = 'An interactive module for visualizing sequence coverage in delimited regions';

//Author
pkg.author = { id: 'jmjuanes', name: 'Josemi Juanes', email: 'josemijuanes@gmail.com' };

//Build directory
pkg.directory = './build';

//Repository
pkg.repository = 'https://github.com/jviz/module-coverviewer';

//Dependencies
pkg.dependencies = { jviz: 'dev' };

//Build tasks
pkg.build = [ 'build:js', 'build:scss' ];

//Tasks
pkg.tasks =
{
  //Build js files
  'build:js': [  { name: 'src', args: src_js }, { name: 'concat', args: 'coverviewer.js' }, { name: 'dest', args: './' } ],

  //Build sass files
  'build:scss': [ { name: 'src', args: src_scss }, { name: 'sass' }, { name: 'dest', args: './' } ]
};

//Exports
module.exports = pkg;
