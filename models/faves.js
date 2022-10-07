const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const favoritesSchema = new mongoose.Schema({
  name: { type: String, require: true },
});

const Faves = mongoose.model("Faves", favoritesSchema);
module.exports = Faves;
