const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const mainRouter = require('./src/routes')


const app = express()

const errorHandler = require('./src/middleware/errorHandling.js')
app.use(errorHandler)

const cors = require("cors")
app.use(cors({
  origin: 'http://localhost:3000',
}))

const port = 3000

console.log(process.env.DB_NAME)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use("/",mainRouter)
app.use('/img',express.static('./tmp'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})