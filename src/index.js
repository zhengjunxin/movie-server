const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const config = require('config')
const bodyParser = require('body-parser')

const apiRoute = require('./routes/api')
const webRoute = require('./routes/web')
const connection = require('./models')

const app = express()

const PORT = config.port
const SECRET = config.session.secret
const MAX_AGE =  config.session.maxAge

app.use(bodyParser.json({limit: '1mb'}))
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))
app.set('views', 'src/views/pages')
app.set('view engine', 'pug')
app.use(session({
    secret: SECRET,
    cookie: {
        maxAge: MAX_AGE
    },
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({ mongooseConnection: connection })
}))

app.use('/api/v1', apiRoute)
app.use('/', webRoute)

app.listen(PORT, () => {
    console.log(`server run at http://localhost:${PORT}`)
})
