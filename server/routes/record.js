import express from "express";
import bodyParser from "body-parser";

// This will help us connect to the database
import db from "../db/connection.js";
import bcrypt from 'bcrypt'; //used for password encyption

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

router.post("/user", async(req, res) =>{
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    };
    let collection = await db.collection("user");
    let result = await collection.insertOne(newUser);
    res.status(201).send({message: "User registered successfully!", userId: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user");
  }
});

export default router;