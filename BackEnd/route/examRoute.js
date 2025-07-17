
const express = require('express');
const { client } = require('../dbConnection');
const { authenticateToken } = require('../middleware/authendicationMiddleware');
const { ObjectId } = require('mongodb');

const app = express();
app.use(express.json());

const router = express.Router();
const dbName = 'examination';

// GET /api/
router.get("/", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const students = db.collection("students");
    const data = await students.find().toArray();
    res.send(data);
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
});

/*

// postmany

// POST /api/exams

router.post("/", authenticateToken, async (req, res) => {
  try {
    await client.connect();
    const db = client.db(ExamName);
    const students = db.collection("students");

    const data = req.body;

    // Check if body is array and non-empty
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ success: false, msg: 'Body must be a non-empty array of student objects' });
    }

    // Validate required fields in each object
    const isValid = data.every(entry => entry.studentName && entry.rollNumber);
    if (!isValid) {
      return res.status(400).json({ success: false, msg: 'Each student must have studentName and rollNumber' });
    }

    const result = await students.insertMany(data);
    res.json({ success: true, insertedCount: result.insertedCount, result });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
});




*/





//postone

router.post("/", 
  // authenticateToken,
   async (req, res) => {
  try {
    await client.connect();
    const db = client.db("ExamName"); 
    const students = db.collection("examination");

    const {
      studentName,
      rollNumber,
      subjectName,
      subjectCode,
      examDate,
      details
    } = req.body;

    // Validation
    if (!studentName || !rollNumber) {
      return res.status(400).json({ success: false, msg: 'Student Name and Roll Number are required' });
    }

    const newStudent = {
      studentName,
      rollNumber,
      subjectName,
      subjectCode,
      examDate,
      details
    };

    const result = await students.insertOne(newStudent);
    res.status(201).json({ success: true, result });
  } catch (error) {
    console.error("Insert Error:", error.message);
    res.status(400).json({ success: false, msg: error.message });
  } finally {
    await client.close(); 
  }
});


router.put("/:id", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const students = db.collection("students");

    const {
      studentName,
      rollNumber,
      subjectName,
      subjectCode,
      examDate,
      details
    } = req.body || {};

    const updateFields = {
      ...(studentName && { studentName }),
      ...(rollNumber && { rollNumber }),
      ...(subjectName && { subjectName }),
      ...(subjectCode && { subjectCode }),
      ...(examDate && { examDate }),
      ...(details && { details })
    };

    const result = await students.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateFields }
    );

    res.json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const students = db.collection("students");
    const result = await students.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
});

module.exports = router;