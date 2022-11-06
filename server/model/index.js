const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const dbURI = 'mongodb+srv://usman:usman@cluster0.qnzrakq.mongodb.net/test'
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log('Connected'))
  .catch((err) => console.log(err))

mongoose.set('useCreateIndex', true)
mongoose.connection.on('error', (error) => console.log(error))
mongoose.Promise = global.Promise
