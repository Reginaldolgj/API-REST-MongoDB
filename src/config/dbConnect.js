import mongoose from "mongoose";

mongoose.connect("mongodb+srv://reginaldolgj:senha123senha@cluster0.sj9mltn.mongodb.net/alura-node");

let db = mongoose.connection;

export default db;