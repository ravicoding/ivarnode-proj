var http = require('http');

var express = require('express'),
       path = require('path');
    
//var Receipe = require('./receipes.js');

var Receipe = require('./rec-nedb.js');

var report = require('./error-report.js');

var appServer = express();
var bodyParser = require('body-parser');
appServer.use(bodyParser.json()); 
appServer.use(bodyParser.urlencoded({ extended: true })); 
appServer.set('port', process.env.PORT || 7000);
appServer.use(express.static(path.join(__dirname, 'public')));
 
appServer.get('/receipes', function (req, res) {
 /* var qry =  Receipe.find();
  console.log(qry);
  qry.exec(function(err,receipes){

  	     console.log(receipes);
  		res.render('/receipes',receipes);
  }); */
  console.log('At get method');
  Receipe.find({},function(err,receipes){
  	console.log(err);
    console.log(receipes);
    res.send(receipes); 
  });

});

appServer.delete('/receipes/:id',function(req,res){
	Receipe.remove({_id:req.params.id},function(err){
		console.log(err);
		res.status(200).send();
	});

});



appServer.post('/receipes',function(req,res){
	console.log('body: ' + JSON.stringify(req.body));
	var obj = req.body;
	//var receipe = new Receipe();
	var robj = {};
	robj.name = obj.tit;
	robj.des = obj.des;
	robj.tags = obj.tg;
	robj.url = obj.url;
	robj.tburl = obj.tbimage;
	robj.type = obj.type;
	robj.created_at = new Date();

	Receipe.insert(robj,function(err,obj) {
  		if (err) {
  			report(err,req);
  			console.error(err);
  		}
  		console.log(obj);
	});
	res.status(200).send('OK')

});



http.createServer(appServer).listen(appServer.get('port'), function(){
  console.log('Express server listening on port ' + appServer.get('port'));
});