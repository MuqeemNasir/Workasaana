const express = require('express')
const cors = require('cors')
const initializeDatabase  = require('./db/db.connect')
require('dotenv').config()
const logger = require('./utils/logger')

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

app.use('/auth', require('./routes/auth.routes'))

app.get('/', (req, res) => res.send("Workasana api's are working"))

if(process.env.NODE_ENV !== 'serverless'){
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
        logger.launch(PORT)
    })
}

module.exports = app 
