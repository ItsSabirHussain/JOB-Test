const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const api = require("./server/routes/todo.route");

const app = express();

app.set("port", process.env.PORT || 5000);

app.use(express.static(path.join(__dirname, "dist")));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

app.use("/", api);

app.get("*", (req, res) => {
  res.send("welcome to you.");
});

var server = app.listen(app.get("port"), function () {
  var port = server.address().port;
  console.log("Magic happens on port " + port);
});
