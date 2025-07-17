const { client } =require("../dbConnection");
const express=require('express')
const router=express.Router()
const jwt = require('jsonwebtoken')

router.post('/', async(req, res) => {
    const {name,departmentId,departmentName,DOB,rollNo,duration,address:{area, district, state}} = req.body;
      await client.connect();
      const db = client.db();
      const responseData = await db
        .collection('users')
        .findOne({name,departmentId,departmentName,DOB,rollNo,duration,address:{area, district, state}});
    if (!responseData) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: responseData._id, username: responseData.name }, 'jjkps', { expiresIn: '1h' });

    res.json({ token });
});

module.exports=router