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
mongoose.connect("mongodb+srv://ankanHalder:bananamanonrun12345@cluster0.bg35g.mongodb.net/userDataDB");


app.route("/login/:email/:password")
.get((req,res)=>{
  const person = mongoose.model('userData', userSchema);
  person.findOne({email:req.params.email}, function (err, personData) {
  if (err) console.log(err);
  s = "Email Found<br>";
  if(personData.password == req.params.password) {
    s += "Password Matches!\n";
    if (!personData.login) s+="User now logged In<br>";
    else s += "Error! User Already logged in!<br>";}
  else s+= "Error!Password Incorrect<br>";
  res.send(s);
  console.log( personData);
  });
})

app.listen(3000, ()=>{
  console.log("Server Running on Port 3000");
} );
