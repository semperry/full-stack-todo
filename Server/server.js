require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 4000

const todoItemRoutes = require('./routes/todoRoutes')

mongoose.Promise = global.Promise;

// Flags for deprecation warnings
mongoose
  .connect(process.env.MONGOLAB_URI, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log("You can talk to your DB now.");
  })
  .catch(error => {
    console.log('Connection error: ' + error);
  })

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// Define root routes for router
app.use('/todos', todoItemRoutes)

app.listen(PORT, () => {
  console.log(`Server is up and at em on port ${PORT}`);
})