import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import records from './routes/record.js';

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", records);
app.use(bodyParser.json())

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})

