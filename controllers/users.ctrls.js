const db = require("../models");
const bcrypt = require("bcrypt");

//
// const index = (req, res) => {
//     res.send('Get route is working')
// }

// POST ROUTE sign up
const signup = (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );

  db.User.create(req.body, (error, createdUser) => {
    if (error) {
      res.status(400).json({ error: error.message });
    } else {
      console.log("user has been registered");
      res.status(201).json(createdUser);
    }
  });
};

// USER LOGIN ROUTE (CREATE SESSION)
const login = (req, res) => {
  db.User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      res.send(err);
    } else {
      if (foundUser) {
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
          // login user and create session
          req.session.currentUser = foundUser;
          console.log("user has been logged in");
          res.status(200).json(foundUser);
        } else {
          res.status(404).json({ error: "Incorrect password" });
        }
      } else {
        res.status(400).json({ error: err });
      }
    }
  });
};

//UPDATE USER
const updateUser = (req, res) => {
    res.send("it works")
  db.User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedUser) => {
      if (error) return res.status(400).json({ error: error.message });
      console.log(updatedUser);
      return res.status(200).json(updatedUser);
    }
  );
};

// DELETE USER
const logout = (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({ msg: "users logged out" });
  });
};

module.exports = {
  signup,
  login,
  logout,
  updateUser,
};
