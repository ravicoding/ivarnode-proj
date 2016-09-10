var http = require('http');

var express = require('express'),
       path = require('path');
    
var Receipe = require('./receipes.js');

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
  Receipe.find(function(err,receipes){
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
	var receipe = new Receipe();
	receipe.name = obj.tit;
	receipe.des = obj.des;
	receipe.tags = obj.tg;
	receipe.url = obj.url;
	receipe.tburl = obj.tbimage;
	receipe.type = obj.type;
	receipe.created_at = new Date();

	receipe.save(function(err,obj) {
  		if (err) return console.error(err);
  		console.log(obj);
	});
	res.status(200).send('OK')

});



http.createServer(appServer).listen(appServer.get('port'), function(){
  console.log('Express server listening on port ' + appServer.get('port'));
});