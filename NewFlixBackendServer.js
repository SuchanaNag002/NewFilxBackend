require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  ph_number: Number,
  email: String,
  password: String,
  Login: Boolean,
  watchlist: Array,
  liked: Array,
  last_viewed: Array,
  catagories: Array,
});
mongoose.connect("mongodb://localhost:27017/userDataDB",{useNewUrlParser:true})
// mongoose.connect(
//   "mongodb+srv://" +
//     process.env.mongoEmailID +
//     ":" +
//     process.env.mongoPassword +
//     "@cluster0.bg35g.mongodb.net/userDataDB"
// );
const person = mongoose.model("userData", userSchema);

app.route("/register/:name/:email/:password").get((req, res) =>{
  person.findOne({ email: req.params.email }, function (err, personData){
    let data = {
      email: false,
      reg:false,
      error:""
    };
      if(err)  
      {
        console.log(err) ;
        data[error]=err;
        res.send(data);
      }   
      if(personData==null){
        const newUser=new person({
          name:req.params.name,
          email:req.params.email,
          password:req.params.password
      })
      newUser.save(function(err){
        if(err) {res.send("Registration unsuccessful")}
        else {res.send("Registration successful")}
      })
      data[reg]=true;
      res.send(data);
    }
    else{
      data[email]=true;
      res.send(data);
    }
  })
})
app.route("/login/:email/:password").get((req, res) => {
  //res.render("Hello")
  let data = {
    email: false,
    password: false,
    signedIn: false,
  };
  person.findOne({ email: req.params.email }, function (err, personData) {
    if (err) console.log(err);
    //res.send(data);
    if (personData == null){
        newUser.save(function(err){
          if(err) {res.send("Registration unsuccessful")}
          else {res.send("Registration successful")}
        })
    }             
    else {
      data.email = true;
      if (personData.password == req.params.password) {
        data.password = true;
        data.signedIn = true;
      } //s += "Error! User Already logged in!<br>";}
      res.send(data);
    }
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, () => {
  console.log("Server is Running ...... ");
});
