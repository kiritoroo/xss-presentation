const express           = require('express')
const dotenv            = require('dotenv')
const session           = require('express-session')
const MongoDBSession    = require('connect-mongodb-session')(session)
const mongoose          = require('mongoose')
const cors              = require('cors')
const cookieParser      = require('cookie-parser')
const app               = express()

dotenv.config()

const port              = process.env.PORT || 5000
const mongo_url         = process.env.MONGO_URI
const sess_name         = process.env.SESS_NAME
const sess_secret       = process.env.SESS_SECRET
const sess_lifetime     = 1000 * 60 * 60 * 1

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
  expires     : 1000
})

app.set("trust proxy", 1)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin      : true,
  methods     : ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  credentials : true
}))
app.use(cookieParser())
app.use(session({
  name              : sess_name,
  secret            : sess_secret,
  resave            : false,
  saveUninitialized : false, 
  store             : store,
  cookie: {
    httpOnly  : false,
    sameSite  : 'lax',
    secure    : false, 
    maxAge    : sess_lifetime
  }
}))

// Routers
app.use('/api', require('./routers/userRoutes'))

app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`)
})