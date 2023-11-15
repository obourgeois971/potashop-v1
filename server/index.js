/*
 * Imports
 */
const express = require("express");

/* Execute Express */
const app = express();

/* Routes */
app.get("/users", function (req, res) {
  res.json({
    data: "Ryan Zen David",
  });
});

/* Run This Server */
app.listen(8000, function () {
  console.log("Node server is running on port 8000");
});
