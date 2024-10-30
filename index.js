require('dotenv').config()
const express = require('express')
const cors = require('cors')
const route = require('./Routes/routes')
require('./Connection/db')
const jwt = require('./Middlewares/jwtMiddleware')

const pfserver = express()

// configuring cors mechinism in server
pfserver.use(cors())
// configuring json middleware to server to convert data from json to native
pfserver.use(express.json())

// pfserver.use(jwt)
// configuring routes into server
pfserver.use(route)

pfserver.use('/uploads', express.static('./uploads'))

const PORT = 3000 || process.env.PORT
pfserver.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`)
})

pfserver.get('/', (req, res)=>{
    res.send("<h1>Welcome to Express Server</h1>")
})