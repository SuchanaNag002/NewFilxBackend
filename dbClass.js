const mongoose = require("mongoose");
const  schemas = require("./schemas.js");


class dbClass{
  // default constructor
  constructor(){
    mongoose.connect("mongodb+srv://" + process.env.mongoEmailID+ ":" + process.env.mongoPassword + "@cluster0.bg35g.mongodb.net/userDataDB");
    //mongoose.connect("mongodb://localhost:27017/userDataDB",{useNewUrlParser:true})
    const userSchema = schemas.userSchema;
    const videoF = schemas.videoF;
    this.person = mongoose.model("userData", userSchema);
    this.video = mongoose.model("videoData", videoF);
  }
  // Login by database
  Login(reqEmail,reqPassword,res){
    let data = {
        email: false,
        password: false,
        signedIn: false,
      };
    this.person.findOne({ email: reqEmail }, function (err, personData){
      if (err) console.log(err);
      if (personData == null){
          res.send(data);
      }
      else {
        // console.log("smkfamfkakfskfsfsfSfsIfjsjfskLjfkljfsklj");
        data.email = true;
        // console.log("dsasdadassd",data);
        if (personData.password == reqPassword) {
          data.password = true;
          data.signedIn = true;
        } //s += "Error! User Already logged in!<br>";}
      }
      res.send(data)
    })// end of db search
  }
    Registration(reqName,reqEmail,reqPassword,res){
    this.person.findOne({ email: reqEmail }, function (err, personData){
      let data = {
        email: false,
        reg:false,
        error:""
      };
        if(err)
        {
          console.log(err) ;
          data[error]=err;
          res.send(data)
        }
        if(personData==null){
          const newUser=new person({
            name:reqName,
            email:reqEmail,
            password:reqPassword
        })
        newUser.save(function(err){
          if(err) {return "Registration unsuccessful"}
          else {return "Registration successful" }
        })
        data[reg]=true;
        res.send(data);
      }
      else{
        data[email]=true;
        res.send(data);
      }
    })
  }
  SearchById(id,res){
  this.video.findById(id,function (err, video){
    if (err) console.log(err);
    else if (video == null) console.log("NULL... Bad Query!!\n");
    else (res.send(video.videoLink));
  })
  }

  SearchByCatagory(reqCatagory,reqLimit,res){
    let cat = reqCatagory;
    this.video.find({Tags: cat}).limit(reqLimit).exec(function(err,videoList){
      if (err) console.log(err);
      if (videoList==[]) console.log("Bad Query. Null Returned. ");
      else{
        res.send(videoList);
        }
      });
    }
}


module.exports = dbClass;
