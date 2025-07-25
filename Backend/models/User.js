const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  savedQuotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quote'
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
