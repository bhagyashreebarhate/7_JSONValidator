require('dotenv').config()
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoDBStore = require('connect-mongodb-session')(session)
const cors = require('cors')
const bodyParser = require('body-parser')
const loginRoutes = require('./routes/loginRoutes')
const jsonRoutes = require('./routes/jsonRoutes')


const app = express()
const port = process.env.PORT || 5001

// This is where your API is making its initial connection to the database
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connection to MongoDB successfull...")).catch((err) => console.log("Unable to connect to MongoDB...", err));

// setting up connect-mongodb-session store
const mongoDBstore = new MongoDBStore({
    uri: process.env.DATABASE_CONNECTION_STRING,
    collection: 'localSessions',
})

// MIDDLEWARES
app.use(cors({credentials: true, origin: true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// SESSIONS HANDLER
const MAX_AGE = 1000 * 60 * 60 * 3 // 3hrs
app.use(
    session({
        secret: 'DUB_NATION',
        name: 'session-id', // cookies name to be put in "key" field in postman
        store: mongoDBstore,
        cookie: {
            maxAge: MAX_AGE, // this is when our cookies will expired and the session will not be valid anymore (user will be log out)
            secure: false, // to turn on just in production
        },
        resave: false,
        saveUninitialized: false,
    })
)


// ROUTERS
app.use('/api', loginRoutes)
app.use('/ProjectJson',jsonRoutes)
// app.use('/Asset',jsonRoutes)


// START SERVER
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

module.exports = app