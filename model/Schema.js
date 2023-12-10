const mongoose = require("mongoose");
const validator = require("validator");

const Schema = new mongoose.Schema({
  book_id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    lowercase: true,
  },
  author:{
    type:String
  },
  price:{
    type:Number
  }
});

module.exports = mongoose.model("BookStores", Schema);
