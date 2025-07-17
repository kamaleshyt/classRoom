const express = require("express");
const { ObjectId } = require("mongodb");
const { client } = require("../dbConnection");
const joi = require("joi");
const router = express.Router();

const dbName = "Classroom";

const schema = joi.object({
  semester: joi.string().required(),
  department_id: joi
    .string()
    .required()
    .custom((value, helpers) => {
      if (!ObjectId.isValid(value)) return helpers.error("any.invalid");
      return value;
    }, "ObjectId Validation"),
  department_name: joi
    .string()
    .valid("CSE", "ECE", "EEE", "MECH", "CIVIL")
    .required(),
  subject: joi
    .array()
    .items(
      joi.object({
        subject_id: joi
          .string()
          .required()
          .custom((value, helpers) => {
            if (!ObjectId.isValid(value)) return helpers.error("any.invalid");
            return value;
          }, "ObjectId Validation"),
        subject: joi.string().required(),
        totalmark: joi.number().required(),
        mark: joi.number().required(),
      })
    )
    .min(1)
    .required(),
});

router.get("/", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const studentMark = db.collection("student_mark");
    const data = await studentMark.find().toArray();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching student marks:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error, value } = schema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { semester, department_id, department_name, subject } = value;

    await client.connect();
    const db = client.db(dbName);
    const studentMark = db.collection("student_mark");

    const newEntry = {
      semester,
      department_id: new ObjectId(department_id),
      department_name,
      subject: subject.map((sub) => ({
        subject_id: new ObjectId(sub.subject_id),
        subject: sub.subject,
        totalmark: sub.totalmark,
        mark: sub.mark,
      })),
    };

    const result = await studentMark.insertOne(newEntry);
    res
      .status(201)
      .json({ message: "Student marks saved", id: result.insertedId });
  } catch (err) {
    console.error("Error creating entry:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error, value } = schema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { semester, department_id, department_name, subject } = value;

    await client.connect();
    const db = client.db(dbName);
    const studentMark = db.collection("student_mark");

    const result = await studentMark.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          semester,
          department_id: new ObjectId(department_id),
          department_name,
          subject: subject.map((sub) => ({
            subject_id: new ObjectId(sub.subject_id),
            subject: sub.subject,
            totalmark: sub.totalmark,
            mark: sub.mark,
          })),
        },
      }
    );

    res.status(200).json({
      message: "Student marks updated",
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    console.error("Error updating entry:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const studentMark = db.collection("student_mark");

    const result = await studentMark.deleteOne({
      _id: new ObjectId(req.params.id),
    });

    res.status(200).json({
      message: "Student record deleted",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    console.error("Error deleting entry:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
