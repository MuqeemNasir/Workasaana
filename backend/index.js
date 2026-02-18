const express = require('express')
const cors = require('cors')
const initializeDatabase  = require('./db/db.connect')
require('dotenv').config()
const logger = require('./utils/logger')
const { errorHandler } = require('./middleware/error.middleware')

const app = express()

app.use(express.json())

const corsOptions = {
    origin: "*",
    credentials: true,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

initializeDatabase()

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`)
    next()
})

app.use('/auth', require('./routes/auth.routes'))
app.use('/teams', require('./routes/team.routes'))
app.use('/projects', require('./routes/project.routes'))
app.use('/tasks', require('./routes/task.routes'))
app.use('/tags', require('./routes/tag.routes'))
app.use('/users', require('./routes/user.routes'))

app.get('/', (req, res) => res.send("Workasana api's are working"))

app.use(errorHandler)

if(process.env.NODE_ENV !== 'serverless'){
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
        logger.launch(PORT)
    })
}

module.exports = app 
