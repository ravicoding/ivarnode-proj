var Datastore = require('nedb');
var db = new Datastore({ filename: 'repdb.db' });

db.loadDatabase(function(err) {
    console.log(err);
	console.log(" Able  to connect...")

});

module.exports = db;
