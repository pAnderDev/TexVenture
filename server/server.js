const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors')
const { mongoose, mongo } = require('mongoose')

const app = express();

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database Connected'))
.catch(() => console.log('Database not Connected', err))

//middleware
app.use(express.json())

app.use('/', require('./routes/authRoutes'))

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`))


