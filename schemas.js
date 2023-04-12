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

const videoF = new mongoose.Schema({
  name: String,
  videoLink: String,
  imageLink: String,
  Tags: Array,
  Likes: Number,
  Actors: Array,
  Description: String
}, { collection: 'videoData' });

module.exports.videoF  = videoF;
module.exports.userSchema = userSchema;
