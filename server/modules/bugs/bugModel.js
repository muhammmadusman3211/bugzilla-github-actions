const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema

const BugSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["Feature", "Bug"],
  },
  status: {
    type: String,
    required: true,
    enum: ["New", "Started", "Completed", "Resolved"],
  },
  deadline: {
    type: Date,
  },
  image: {},
  creator: {
    type: String,
    creator_id: Number,
  },
  developers: [{ type: Schema.Types.ObjectId, ref: "user" }],
})

const BugModel = mongoose.model("bug", BugSchema)

module.exports = BugModel
