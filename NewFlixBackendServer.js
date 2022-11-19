require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name : String,
  ph_number: Number,
  email : String,
  password : String,
  Login: Boolean,
  watchlist: Array,
  liked: Array,
  last_viewed: Array,
  catagories:Array
});
mongoose.connect("mongodb+srv://" + process.env.mongoEmailID + ":" + process.env.mongoPassword + "@cluster0.bg35g.mongodb.net/userDataDB");
const person = mongoose.model('userData', userSchema);

app.route("/login/:email/:password")
.get((req,res)=>{

  let data = {
    email : false,
    password : false,
    signedIn : false
  }
  person.findOne({email:req.params.email}, function (err, personData) {
  if (err) console.log(err);
  if (personData == null) res.send(data);
  else{
      data.email = true;
      s = "Email Found<br>";
      if(personData.password == req.params.password) {
        data.password =true;
        s += "Password Matches!\n";
        if (!personData.login) s+="User now logged In<br>";
        else data.signedIn = true;} //s += "Error! User Already logged in!<br>";}
      else s+= "Error!Password Incorrect<br>";
      res.send(data);
    }
  });
})


let port = process.env.PORT;
if (port == null || port == ""){
  port = 8000;
}

app.listen(port, ()=>{
  console.log("Server is Running ...... ");
} );
