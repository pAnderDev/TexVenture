import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGO_URL || "";

//set up the client object
const client = new MongoClient(URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});


//connect the client to the server
async function connectToDatabase() {
    try {
        await client.connect();
        // Ping the server to confirm connection
        await client.db("admin").command({ ping: 1 });
        console.log("Ping your deployment. You successfully connected to MongoDB!");
    } catch (err) {
        console.error("Connection error: ", err);
    }
}

await connectToDatabase();

const db = client.db("player");

export default db;