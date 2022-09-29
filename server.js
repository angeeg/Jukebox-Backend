require("dotenv").config();

/* == External  modules == */
const express = require("express");

/* == Internal  modules == */
const routes = require("./routes");

/* == cors == */
// const cors = require('cors');

// const session = require('express-session');

/* PORT */
const PORT = process.env.PORT || 3000;

/* == Express Instance == */
const app = express();

/* == DB connection == */
require("./config/db.connection");

/* == Middleware == */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* == Routes == */

app.use("/users", routes.users);

/* == Server Bind == */
app.listen(PORT, () => {
  console.log(`Port is listening!`);
});
