var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/listUsers', function (req, res) {
   fs.readFile("./" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
});

app.get('/listUser/:uuid', function (req, res) {
   // First read existing users.
   fs.readFile( "./" + "users.json", 'utf8', function (err, data) {
       users = JSON.parse( data );
       var user = users["user" + req.params.uuid] 
       console.log( user );
       res.end( JSON.stringify(user));
   });
});


app.post('/addUser', function (req, res) {
     var uuid  = req.body.uuid;
     var uname = req.body.uname;
     var prof  = req.body.prof;
     var passwd = req.body.passwd;
     var str = 'Name: '+ uname +', PROF: '+prof+' UUID: '+uuid+' PASS: '+ passwd;
     console.log( str );

    var nuname = "user"+uuid;
    var newUser = {
        "newUser":{
            "name":uname,
            "passwordd":passwd,
            "profession":prof,
            "id":parseInt(uuid)
        }
    }
       // console.log( newUser );

     fs.readFile( "./" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        data[nuname] = newUser["newUser"];
        console.log( data );
        fs.writeFile( "./" + "users.json",JSON.stringify(data),function(err){
            res.end( JSON.stringify(data));
        });
     });
});

//app.put('/updateUser', function (req, res) {
app.post('/updateUser', function (req, res) {
    console.log( "IN PUT" );
     var uuid  = req.body.uuid;
     var uname = req.body.uname;
     var prof  = req.body.prof;
     var passwd = req.body.passwd;
     
     /*var uuid  = req.query.uuid;
     var uname = req.query.uname;
     var prof  = req.query.prof;
     var passwd = req.query.passwd;*/

     var str = 'UPDATE: Name: '+ uname +', PROF: '+prof+' UUID: '+uuid+' PASS: '+ passwd;

    var newUser = {
        "newUser":{
            "name":uname,
            "passwordd":passwd,
            "profession":prof,
            "id":parseInt(uuid)
        }
    }

     fs.readFile( "./" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        data["user"+uuid] = newUser["newUser"];
        console.log( data );
        fs.writeFile( "./" + "users.json",JSON.stringify(data),function(err){
            res.end( JSON.stringify(data));
        });
        res.end( JSON.stringify(data));
     });
});

app.delete('/deleteUser/:id', function (req, res) {

     /*var uuid  = req.query.uuid;
     var uname = req.query.uname;
     var prof  = req.query.prof;
     var passwd = req.query.passwd;*/

});



var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});

