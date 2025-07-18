import React, { useState } from "react";
import ExamForm from './ExamForm';
import {Close} from '@mui/icons-material'
import BasicTable from './TableData';

import {
  TextField,
  Box,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5010/exam",
});

const Form = ({ onClose, setSubmittedData }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    rollNumber: '',
    subjectName: '',
    subjectCode: '',
    examDate: '',
    details: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/", formData);
      alert("Form submitted successfully!");
      setSubmittedData(formData);
      onClose();  // Close the dialog
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed. Check console.");
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Student Examination Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="studentName" label="Student Name" fullWidth required sx={{ mb: 2 }} value={formData.studentName} onChange={handleChange} />
        <TextField name="rollNumber" label="Roll Number" fullWidth required sx={{ mb: 2 }} value={formData.rollNumber} onChange={handleChange} />
        <TextField name="subjectName" label="Subject Name" fullWidth required sx={{ mb: 2 }} value={formData.subjectName} onChange={handleChange} />
        <TextField name="subjectCode" label="Subject Code" fullWidth sx={{ mb: 2 }} value={formData.subjectCode} onChange={handleChange} />
        <TextField name="examDate" label="Exam Date" type="date" fullWidth sx={{ mb: 2 }} value={formData.examDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
        <TextField name="details" label="Additional Details" fullWidth multiline rows={4} sx={{ mb: 2 }} value={formData.details} onChange={handleChange} />
        <Button type="submit" variant="contained" fullWidth>Submit</Button>
      </form>
    </Box>
  );
};

export default Form;