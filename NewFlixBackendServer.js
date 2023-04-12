require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const  schemas = require("./schemas.js");
const dbClass = require('./dbClass.js');

// const userSchema = schemas.userSchema;
// const videoF = schemas.videoF;
// //mongoose.connect("mongodb://localhost:27017/userDataDB",{useNewUrlParser:true})
// mongoose.connect("mongodb+srv://" + process.env.mongoEmailID+ ":" + process.env.mongoPassword + "@cluster0.bg35g.mongodb.net/userDataDB");
// const person = mongoose.model("userData", userSchema);
// const video = mongoose.model("videoData", videoF);

const db  = new dbClass();
console.log(db);

app.route("/register/:name/:email/:password").get((req, res) =>{
      db.Registration(req.params.name, req.params.email,req.params.password,res);
  })



app.route("/login/:email/:password").get((req, res) => {
  //res.render("Hello")
      db.Login(req.params.email,req.params.password,res);
    });


app.route("/main/getRow/:catagory/:limit").get(function(req,res){
        db.SearchByCatagory(req.params.catagory,req.params.limit,res);
      });
app.route("/playVideo/:id").get(function(req,res){
        db.SearchById(req.params.id,res);
            });





let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(8000, () => {
  console.log("Server is Running ...... ");
});
