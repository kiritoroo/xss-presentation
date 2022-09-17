const express           = require('express')
const dotenv            = require('dotenv')
const session           = require('express-session')
const MongoDBSession    = require('connect-mongodb-session')(session)
const mongoose          = require('mongoose')
const app               = express()

dotenv.config()

const port              = process.env.PORT || 5000
const mongo_url         = process.env.MONGO_URI

mongoose
  .connect(mongo_url, {
    useNewUrlParser       : true,
    useUnifiedTopology    : true
  })
  .then((res) => {
    console.log("MongoDB connected")
  })
  .catch((err) => {
    console.log(err)
  })

const store = new MongoDBSession({
  uri         : mongo_url,
  collection  : 'sessions',
})

app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret            : 'zingme',
  resave            : false,
  saveUninitialized : false, 
  store             : store,
}))

// Routers
app.use('/api', require('./routers/userRoutes'))

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})