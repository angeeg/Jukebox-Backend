const db = require("../models");

//get all favorite songs

const index = (req, res) => {
  db.Faves.find({}, (err, faves) => {
    if (err) return res.status(400).json({ error: err.message });
    return res.status(200).json({
      faves,
      requestedAt: new Date().toLocaleDateString(),
    });
  });
};

// create a favorite with req.body
const create = (req, res) => {
  db.Faves.create(req.body, (err, createdFav) => {
    if (err) return res.status(404).json({ error: err.message });
    return res.status(200).json(createdFav);
  });
};

//destroy a single favorite by its ID
const destroy = (req, res) => {
  db.Faves.findByIdAndDelete(req.params.id, (error, deletedFav) => {
    //if no Favorites is found, let the frontend know with the json error message
    if (!deletedFav)
      return res.status(400).json({ error: "Favorite not found" });
    //if an error is produced, display it
    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json({
      message: `Favorite ${deletedFav.name} deleted successfully! `,
    });
  });
};

//updating a single favorite
const update = (req, res) => {
  db.Faves.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true },
    (err, updatedFav) => {
      if (err) return res.status(400).json({ error: err.message });
      return res.status(200).json(updatedFav);
    }
  );
};
module.exports = {
  index,
  create,
  destroy,
  update,
};
