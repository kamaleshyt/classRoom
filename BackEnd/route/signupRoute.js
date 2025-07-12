const { client } =require("../dbConnection");
const express=require('express')
const router=express.Router()

router.post(
  '/',
  async (req, res) => {
    try {
      console.log('inside Callback');
      await client.connect();
      const db = client.db();
      console.log(req.body);
      const responseData = await db
        .collection('users')
        .insertOne({ ...req.body, cAt: new Date() });
      res.send(responseData);
    } catch (error) {
      console.error(error);
      res.send({ message: error.message });
    }
  }
);

module.exports=router