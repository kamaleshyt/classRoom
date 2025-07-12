const express=require('express');
const { client } = require('../dbConnection');
const { authenticateToken } = require('../middleware/authendicationMiddleware');
const router=express.Router()
router.get("/", async (req, res) => {
  await client.connect();
  const db = client.db(dbName);
  const students = db.collection("students");
  const data = await students.find().toArray();
  res.send(data);
});

router.post("/",authenticateToken, async (req, res) => {
  await client.connect();
  const db = client.db();
  const students = db.collection("students");
  const { name, roll } = req.body||{};
  if(!name){
    return res.status(400).json({success:false,msg:'Name is required'})
  }
  const result = await students.insertOne({ name, roll });
  res.send(result);
});

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  await client.connect();
  const db = client.db(dbName);
  const students = db.collection("students");
  const result = await students.deleteOne({
    _id: new ObjectId(req.params.id),
  });
  res.send(result);
});

module.exports=router