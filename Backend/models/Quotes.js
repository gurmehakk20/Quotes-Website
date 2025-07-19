const mongoose = require("mongoose")

const quoteSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approved: { type: Boolean, default: false }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Quote", quoteSchema)