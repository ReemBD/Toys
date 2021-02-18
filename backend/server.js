const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const app = express()
const http = require('http').createServer(app)

const session = expressSession({
    secret: 'some secret token',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
});

// Config the express App
app.use(cookieParser())
app.use(bodyParser.json())
app.use(session)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}


const toyRoutes = require('./api/toy/toy.routes')
const authRoutes = require('./api/auth/auth.routes')
const reviewRoutes = require('./api/review/review.routes')
const userRoutes = require('./api/user/user.routes')
const { connectSockets } = require('./services/socket.service')

//routes
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
app.all('*', setupAsyncLocalStorage)

app.use('/api/toy', toyRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/review', reviewRoutes)
connectSockets(http, session)

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030
http.listen(port, () => {
    logger.info('Server is running on port: ', port)
})
