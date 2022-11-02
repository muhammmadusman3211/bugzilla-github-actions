const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  creator: {
    type: String,
  },
  developers: [{ type: Schema.Types.ObjectId, ref: "user" }],
  bugs: [{ type: Schema.Types.ObjectId, ref: "bug" }],
})

const ProjectModel = mongoose.model("project", ProjectSchema)

module.exports = ProjectModel
