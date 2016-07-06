var express = require('express')
var yaml = require("js-yaml");
var fs = require("fs");
var _ = require('lodash')

//start the express app
var app = express();

//instantiate server with app
var server = require('http').Server(app);

// application configuration
////////////////////////////

// read configuration from config.json, export to app.locals
process.env.ENV_VAR_CONFIG_FILE = 'config.json';
_.assign(app.locals, require('var'));

var e = yaml.load(fs.readFileSync("./test.yaml"));
for (var key in e) {
  if (e.hasOwnProperty(key)) {
    app.get("/"+key+"/", function(req, res) {
      console.log(this)
      var model = require('./model/'+this.model);
      // res.render(e[key].name);
    }.bind(e[key]));
  }
};
app.get('/', function(req, res){
  console.log('root');
})
server.listen(app.locals.PORT);
