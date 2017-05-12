var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

// Create an instance of the express app.
var app = express();
var fs = require('fs');
var path = require('path'); 
var bodyParser = require('body-parser');
// Specify the port.
var port = 3000;
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");




var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "bigdad",
  database: "BurgerMan"
});

/*
app.get("/", function(req, res) {
    res.render("index", {elements:mock_data, newValue:"why man!?",myTitle:"blech" });
});

*/

var dateSend = 0 ; 
app.get('/', function(req, res){

   fs.readFile('burgerT.html', function(error ,data){
     res.send(data);

   });

});


app.get('/burger2', function(req, res){

   fs.readFile('burger2.html', function(error ,data){
     res.send(data);

   });

});





app.post('/api/burgerC', function(req, res ){
  var good = req.body;
  var bre = good.burger;
  //console.log(good.burger);
   connection.query( "INSERT INTO eatingBurger (type) VALUES (?)",[bre],
      function (err, res) {
          if (err) {
            throw err;
          }


      
        
    });
      
      



    //res.json(struction); 
  res.redirect("/");




}); 



app.get('/api/burgerQ', function(request, response ){

   
   connection.query( 'SELECT * FROM eatingBurger',
      function (err, res) {
          if (err) {
            throw err;
          }

       console.log(res);   
       response.json(res);
      
        
   });
      
      



    
  




});  





app.listen(port, function () {
  console.log('Example app listening on port '+ port);
});