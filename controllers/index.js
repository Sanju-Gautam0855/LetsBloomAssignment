const Schema = require("../model/Schema");

const getAllProducts = async (req, res) => {
  const myData = await Schema.find({});
  res.status(200).send(myData);
};

const postAllProducts = async (req, res) => {
  const myData = await new Schema(req.body);
  myData.save();
  res.send(myData);
};

module.exports = {
  getAllProducts,
  postAllProducts,
};