const { ObjectId } = require('mongoose')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title cannot be empty'],
    unique: [true, 'Title has already been taken'],
  },
  creator: {
    type: ObjectId,
  },
  developers: [{ type: Schema.Types.ObjectId, ref: 'user', index: true }],
  qa: [{ type: Schema.Types.ObjectId, ref: 'user', index: true }],
  bugs: [{ type: Schema.Types.ObjectId, ref: 'bug' }],
})

const ProjectModel = mongoose.model('project', ProjectSchema)

module.exports = ProjectModel
