   // set up =====a===================
    var express  = require('express');
    var app      = express();
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    var http = require('http');
    var port = 8181;

    app.use(express.static(__dirname + '/public'));  				 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());


var httpServer = http.Server(app);
httpServer.listen(port, function(){
    console.log("server listening on port", port);
});
 
     var engines = require('consolidate');

    app.set('views', __dirname + '/public');
   

    
    app.engine('html', engines.mustache);

    app.set('view engine', 'html');



const password = "MY_SECRET_PASSWORD";
var mongoose = require('mongoose');
mongoose.connect('mongodb://user:' + password + '@localhost/new');


const token = "user:password";

var Schema = mongoose.Schema;

// create a schema
var complainSchema = new Schema({
  id_komplain: { type: String, required: true, unique: true },
  isi_komplain: { type: String, required: true },
  status : String,
  reported_by : String,
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Complain = mongoose.model('Complain', complainSchema);

// on every save, add the date
complainSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});


// make this available to our users in our Node applications
module.exports = Complain;


// get all the users
//Complain.find({}, function(err, data) {
//  if (err) throw err;

  // object of all the users
 // console.log(data);
//  });

    function alphanumeric_unique() {
        return Math.random().toString(36).split('').filter( function(value, index, self) { 
            return self.indexOf(value) === index;
        }).join('').substr(2,5).toUpperCase();
    }



app.post('/updateComplain' , function(req,res){

    Complain.findOneAndUpdate({ id_komplain : req.body.idKomplain }, {status : req.body.statusKomplain}, function(err, data) {
      if (err){
        status = {};
      }
      else {
        status = data;
      }
      res.json(status);
    });
});

app.get('/getComplain/:idComplain',function(req,res){
    Complain.find({ id_komplain : req.params.idKomplain}, function(err, data) {
      if (err)
        {
            status = {}; 
        }
        else {
            status = data;
        }
        res.json( status );
      // show the one user
    });
});

app.get('/listAllComplain',function(req,res){
    Complain.find({}, function(err, data) {
      if (err)
        {
            status = {}; 
        }
        else {
            status = data;
        }
        res.json( status );
      // show the one user
    });
});




app.post('/createComplain',function(req,res){
    // create a new user
    var id = alphanumeric_unique();
    var newComplain = Complain({
      id_komplain: id,
      isi_komplain : req.body.isi_komplain,
      status: 'Open',
      reported_by: req.body.reported_by,
    });



    newComplain.save(function(err) {
        if (err) 
        {
            status = err;
        }
        else {
            status = "Complain already created with ID Complain : " + id;
        }
        res.json( status );   
    });


   
});


 app.get('/', function(req, res) {
        res.render('index')
 });
