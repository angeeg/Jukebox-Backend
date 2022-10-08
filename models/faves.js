const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const favoritesSchema = new mongoose.Schema({
  type: { type: String, require: true},
  name: { type: String, require: true },
  superFave: { type: Boolean, default: false}
});

const Faves = mongoose.model("Faves", favoritesSchema);
module.exports = Faves;
