var stripe = require('stripe')('sk_test_zGtrmCQ00jQyDYcOio0d6F2M');
var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require("body-parser");

// var listSms = [];
// var contactList =[];

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static("public"));

// set of views engine for handlebars ejs for ejs
app.set('view engine', 'ejs')

// set the route from login page to  the home page
app.get('/', function(req, res){
  console.log("hi this list rendering "); 
   res.render("index", { }); 
});

app.get('/paysuccess', function(req, res){
  console.log("hi this list rendering "); 
   res.render("paysuccess", { }); 
});

app.post('/charge', function(req, res){
  console.log("hi this is the stripe api example "); 
  var token = req.body.stripeToken;
  var chargeAmount = req.body.chargeAmountt;
  var charge = stripe.charges.create({
    amount: chargeAmount,
    currency: 'usd',
    source: token
  }, function(err, charge){
      if(err & err.type === "stripeCardError"){
        console.log(" Your card was declined")
      }
    });


   res.redirect("/paysuccess"); 
  
});
app.listen(port, function(){
  console.log('Stripe is running');
});

 
 