const express=require('express');
const { client } = require('../dbConnection');
const { authenticateToken } = require('../middleware/authendicationMiddleware');
const router=express.Router()
const collection ='departments'

router.get("/dep", async (req, res) => {
  await client.connect();
  const db = client.db(dbName);
  const students = db.collection(collection);
  const data = await students.find().distinct('name').toArray();
  res.send(data);
});

router.get("/", async (req, res) => {
  await client.connect();
  const db = client.db();
  const students = db.collection(collection);
  const data = await students.find().toArray();
  res.send(data);
});

router.post("/", async (req, res) => {
  await client.connect();
  const db = client.db();
  const department = db.collection(collection);
  const result = await department.insertOne(req.body);
  res.send(result);
});

router.put("/:id", async (req, res) => {
  await client.connect();
  const db = client.db(dbName);
  const students = db.collection(collection);
  const { name, roll } = req.body;
  const result = await students.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { name, roll } }
  );
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  await client.connect();
  const db = client.db(dbName);
  const students = db.collection(collection);
  const result = await students.deleteOne({
    _id: new ObjectId(req.params.id),
  });
  res.send(result);
});

module.exports=router