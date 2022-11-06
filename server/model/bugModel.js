const mongoose = require('mongoose')
const { ObjectId } = require('mongoose')

const Schema = mongoose.Schema

const BugSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title cannot be empty'],
    unique: [true, 'Title has already been taken'],
    min: [1, 'Title has to be of atleast 1 character'],
  },
  type: {
    type: String,
    required: [true, 'Type cannot be empty'],
    enum: ['Feature', 'Bug'],
  },
  status: {
    type: String,
    required: [true, 'Status cannot be empty'],
    enum: ['New', 'Started', 'Completed', 'Resolved'],
  },
  deadline: {
    type: Date,
  },
  image: {},
  creator: {
    type: ObjectId,
  },
  developers: [{ type: Schema.Types.ObjectId, ref: 'user' }],
})

const BugModel = mongoose.model('bug', BugSchema)

module.exports = BugModel
