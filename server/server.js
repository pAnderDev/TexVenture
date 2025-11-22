const express = require('express');
const path = require('path')
// load .env from project root
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') })
const cors = require('cors')
const mongoose = require('mongoose')
const { MongoClient} = require('mongodb')
const cookieParser = require('cookie-parser')

const app = express();

//database connection

let client;
// ensure we have a valid MONGO_URL
const rawUri = process.env.MONGO_URL;
if (!rawUri) {
    console.error('MONGO_URL is not defined. Please set it in the .env file.');
    process.exit(1);
}

// strip surrounding quotes if present
const uri = rawUri.replace(/^"|"$/g, '');

try {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (err) {
    console.error('Invalid MONGO_URL:', err.message);
    process.exit(1);
}

async function connectDB() {
    try {
        await client.connect();
        console.log('Database Connected');
        // keep the connection open; export or attach `client`/`db` as needed
        const db = client.db();
        // optionally make db available via app.locals
        app.locals.db = db;
    } catch (err) {
        console.log('Database not Connected', err);
        process.exit(1);
    }
}

connectDB();

//middleware
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))

app.use('/', require('./routes/authRoutes'))

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`))


