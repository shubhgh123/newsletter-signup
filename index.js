//jshin esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https=require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const LastName = req.body.lName;
  const email = req.body.email;

  const data={
    members: [
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:LastName
        }
      }
    ]
  };
  var jsonData=JSON.stringify(data);
  const url="https://us17.api.mailchimp.com/3.0/lists/7da6d14224";

  const options={
    method:"POST",
    auth: "shubham1:3c1cb52e9ff55a7391d0f9d377462089-us17"
  }

  const request= https.request(url,options,function(response){
    if(response.statusCode===200){
      res.send("sucessfully suscribed");
    } else{
      res.send("there was error in sign in");
    }
    
    
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
});


app.listen(3000, function() {
  console.log("server is running on 3000");
});

//api key
//3c1cb52e9ff55a7391d0f9d377462089-us17
//7da6d14224
