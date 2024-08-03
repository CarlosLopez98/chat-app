require("dotenv").config()
const express = require('express')
const cookieParser = require('cookie-parser')
const { dbConnect } = require('./config/database')
const { app, server } = require('./socket/socket')

const routes = require('./routes')

// const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

app.use('/api', routes)

// app.get('/', (req, res) => {
//   res.send('hello world')
// })

dbConnect()

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})