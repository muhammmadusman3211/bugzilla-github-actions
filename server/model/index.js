const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

//const dbURI = "mongodb+srv://usman:usman@cluster0.qnzrakq.mongodb.net/test"
const dbURI = "mongodb://admin:password@mongodb:27017"
console.log(dbURI)
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) =>
    console.log("Connected to mongodb HURRAYYYYYYYYY lksdjalskdjaslkjd")
  )
  .catch((err) => console.log(err))

mongoose.set("useCreateIndex", true)
mongoose.connection.on("error", (error) => console.log(error))
mongoose.Promise = global.Promise
