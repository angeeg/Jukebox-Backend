require("dotenv").config();

/* == External  modules == */
const express = require("express");

/* == Internal  modules == */
const routes = require("./routes");

/* == cors == */
const cors = require("cors");

const whitelist = ["http://localhost:3000", `${process.env.FRONTEND_URL}`];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const session = require("express-session");

/* PORT */
const PORT = process.env.PORT || 3003;

/* == Express Instance == */
const app = express();

/* == DB connection == */
require("./config/db.connection");

/* == Middleware == */
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* == Routes == */

app.get("/", function (req, res) {
  res.send("hello");
});

app.use("/users", routes.users);

/* == Server Bind == */
app.listen(PORT, () => {
  console.log(`Port is listening!`);
});
