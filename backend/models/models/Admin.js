const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "admin",
  },
  createdAt: Date,
  password: String,
});

module.exports = mongoose.model("Admin", AdminSchema);