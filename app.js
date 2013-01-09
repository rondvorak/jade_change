/**
 * Module dependencies.
 */
var express = require('express')
var http = require('http');
var app = express();

var i = require('eyes').inspector({});

//require('wrench').rmdirSyncRecursive('./public/images/slider/',function(){});



// Configuration
app.configure(function(){
  app.set('interface', process.env.INTERFACE || '192.168.56.1' );
  app.set('reload', process.env.RELOAD || false );
  app.set('port', process.env.PORT || 2312);
  app.set('views', __dirname + '/public');
  app.set('view engine', 'jade');
  app.set('view options', {layout:false });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
	app.use(express.directory(__dirname +'/public'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.favicon());
  app.use(express.logger('dev'));

});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.locals.pretty = true;
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', function(req,res){
		res.render('index',{DATA:{
    PLATFORM:'browser',
    ADDRESS:app.get('interface'),
    PORT:app.get('port'),
    RELOAD:app.get('reload')
    }});
});

app.get('/ipad', function(req,res){
		res.render('index',{DATA:{
    PLATFORM:'ipad',
    ADDRESS:app.get('interface'),
    PORT:app.get('port'),
    RELOAD:false
    }});
});





app.get('/list/*',function(req,res){
  require('fs').readdir('public/'+ req.params[0],function(err,files){

    if(err){
      res.end(JSON.stringify(false));
      return
    }

    var result = [];

    require('async').forEach(
      files,
      function(file,cb){
        
        file = 'public/' + req.params[0] +'/' + file;
          i(file)

         require('fs').stat( file,function(err,stats){
          if(stats.isFile()){
          result.push(file.replace('public',''));
          }
          cb();
        })
      },
      function(err){
        if(err){
          i('error! listing files');
          res.end(JSON.stringify(false));
        }else{
          res.end(JSON.stringify(result));
        }
      });
  })


});



http.createServer(app).listen(app.get('port'), function(){
  console.log("App listening on interface "+app.get('interface') + " using port " + app.get('port'));
});
