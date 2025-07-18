import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

const api = axios.create({
  baseURL: "http://localhost:5010/exam"
});

const ExamForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    rollNumber: '',
    subjectName: '',
    subjectCode: '',
    examDate: '',
    details: '',
  });

  const [submittedData, setSubmittedData] = useState(null);

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
      console.log("Server response:", response.data);
      alert("Form submitted successfully!");
      setSubmittedData(formData);
      setFormData({
        studentName: '',
        rollNumber: '',
        subjectName: '',
        subjectCode: '',
        examDate: '',
        details: '',
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed. Check console.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          backgroundColor: "white",
          borderRadius: 4,
          boxShadow: 4,
          p: 4
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
          Student Examination Subject Details Form
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Student Name"
            name="studentName"
            fullWidth
            value={formData.studentName}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Roll Number"
            name="rollNumber"
            fullWidth
            value={formData.rollNumber}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Subject Name"
            name="subjectName"
            fullWidth
            value={formData.subjectName}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Subject Code"
            name="subjectCode"
            fullWidth
            value={formData.subjectCode}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Exam Date"
            type="date"
            name="examDate"
            fullWidth
            value={formData.examDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Additional Details"
            name="details"
            fullWidth
            multiline
            rows={4}
            value={formData.details}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" type="submit" fullWidth>
            Submit
          </Button>
        </form>

        {submittedData && (
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ p: 2 }}>
              Submitted Data Summary
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Roll Number</TableCell>
                  <TableCell>Subject Name</TableCell>
                  <TableCell>Subject Code</TableCell>
                  <TableCell>Exam Date</TableCell>
                  <TableCell>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{submittedData.studentName}</TableCell>
                  <TableCell>{submittedData.rollNumber}</TableCell>
                  <TableCell>{submittedData.subjectName}</TableCell>
                  <TableCell>{submittedData.subjectCode}</TableCell>
                  <TableCell>{submittedData.examDate}</TableCell>
                  <TableCell>{submittedData.details}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default ExamForm;