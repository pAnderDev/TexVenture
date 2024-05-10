import express from "express"
import mongoos from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

const app = express();
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoos.connect(MONGOURL).then(() => {
    console.log("Connected");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error)=>console.log(error))