const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const client = new MongoClient(MONGO_URI);
const dbName = "studentdb";

app.get("/students", async (req, res) => {
  await client.connect();
  const db = client.db(dbName);
  const students = db.collection("students");
  const data = await students.find().toArray();
  res.send(data);
});

app.post("/students", async (req, res) => {
  await client.connect();
  const db = client.db(dbName);
  const students = db.collection("students");
  const { name, roll } = req.body;
  const result = await students.insertOne({ name, roll });
  res.send(result);
});

app.put("/students/:id", async (req, res) => {
  await client.connect();
  const db = client.db(dbName);
  const students = db.collection("students");
  const { name, roll } = req.body;
  const result = await students.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { name, roll } }
  );
  res.send(result);
});

app.delete("/students/:id", async (req, res) => {
  await client.connect();
  const db = client.db(dbName);
  const students = db.collection("students");
  const result = await students.deleteOne({
    _id: new ObjectId(req.params.id),
  });
  res.send(result);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
