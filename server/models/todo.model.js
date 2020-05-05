const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const toDoSchema = new Schema({
  Name: String,
  Email: String,
  Phone: String,
  Date_Created: Date,
  Date_Modified: Date,
});

module.exports = mongoose.model("todo", toDoSchema, "todo");
