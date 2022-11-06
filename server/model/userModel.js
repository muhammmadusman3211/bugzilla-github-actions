const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name cannot be empty'],
  },
  email: {
    type: String,
    required: [true, 'Email cannot be empty'],
    unique: [true, 'Email has already been taken'],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'Password cannot be empty'],
    min: [5, 'Password cannot be shorter than 5 characters'],
  },
  role: {
    type: String,
    required: [true, 'Role cannot be empty'],
    enum: ['Manager', 'Developer', 'Qa'],
  },
  projects: [{ type: Schema.Types.ObjectId, ref: 'project' }],
})

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10)

  this.password = hash
  next()
})

UserSchema.methods.isValidPassword = async function (password) {
  const user = this
  const compare = await bcrypt.compare(password, user.password)

  return compare
}

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel
