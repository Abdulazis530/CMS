const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataDateSchema = new Schema({
  letter: String,
  frequency: Number
});

module.exports = mongoose.model("DataDate", dataDateSchema);