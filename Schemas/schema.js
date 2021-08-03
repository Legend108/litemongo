const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  key: mongoose.SchemaTypes.String,
  value: mongoose.SchemaTypes.String,
});

module.exports = mongoose.model("sMongoose", schema);
