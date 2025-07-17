import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Box,
  Button,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from "@mui/icons-material/Delete";

const api = axios.create({
  baseURL: "http://localhost:5010/student_mark",
});

const SemesterForm = () => {
  const [formData, setFormData] = useState({
    semester: "",
    department_id: "",
    department_name: "",
    subject: [],
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = (index, e) => {
    const updatedSubjects = [...formData.subject];
    updatedSubjects[index][e.target.name] = e.target.value;
    setFormData({ ...formData, subject: updatedSubjects });
  };

  const addSubject = () => {
    setFormData({
      ...formData,
      subject: [
        ...formData.subject,
        {
          subject_id: uuidv4(),
          subject: "",
          totalmark: "",
          mark: "",
        },
      ],
    });
  };

  const removeSubject = (index) => {
    const updatedSubjects = [...formData.subject];
    updatedSubjects.splice(index, 1);
    setFormData({ ...formData, subject: updatedSubjects });
  };

  const handleSubmit = async () => {
    if (
      !formData.semester ||
      !formData.department_id ||
      !formData.department_name
    ) {
      alert("Please fill all semester and department details");
      return;
    }

    if (formData.subject.length === 0) {
      alert("Add at least one subject");
      return;
    }

    try {
      const response = await api.post("/", formData);
      console.log("Server response:", response.data);
      alert("Data submitted successfully!");
      setSubmittedData(formData);
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit. Check console.");
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Semester Form</Typography>

      <TextField
        fullWidth
        label="Semester"
        name="semester"
        value={formData.semester}
        onChange={handleChange}
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        label="Department ID"
        name="department_id"
        value={formData.department_id}
        onChange={handleChange}
        sx={{ mt: 2 }}
      />

      {/* Dropdown using plain HTML <select> */}
      <Box sx={{ mt: 2 }}>
        <label htmlFor="department_name">Department Name</label>
        <select
          id="department_name"
          name="department_name"
          value={formData.department_name}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginTop: "4px" }}
        >
          <option value="">-- Select Department --</option>
          <option value="ECE">ECE</option>
          <option value="CSE">CSE</option>
          <option value="EEE">EEE</option>
          <option value="MECH">MECH</option>
          <option value="CIVIL">CIVIL</option>
        </select>
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 3 }}>
        Subjects
      </Typography>

      {formData.subject.map((subj, index) => (
        <Box
          key={subj.subject_id}
          sx={{ display: "flex", gap: 1, alignItems: "center", mt: 1 }}
        >
          <TextField
            label="Subject"
            name="subject"
            value={subj.subject}
            onChange={(e) => handleSubjectChange(index, e)}
          />
          <TextField
            label="Total Mark"
            name="totalmark"
            value={subj.totalmark}
            onChange={(e) => handleSubjectChange(index, e)}
          />
          <TextField
            label="Mark"
            name="mark"
            value={subj.mark}
            onChange={(e) => handleSubjectChange(index, e)}
          />
          <IconButton onClick={() => removeSubject(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Button variant="outlined" onClick={addSubject} sx={{ mt: 2 }}>
        Add Subject
      </Button>

      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2, ml: 2 }}>
        Submit
      </Button>

      {/* Display Table */}
      {submittedData && (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ p: 2 }}>
            Semester Summary
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Semester</TableCell>
                <TableCell>Department ID</TableCell>
                <TableCell>Department Name</TableCell>
                <TableCell>Subjects</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{submittedData.semester}</TableCell>
                <TableCell>{submittedData.department_id}</TableCell>
                <TableCell>{submittedData.department_name}</TableCell>
                <TableCell>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Subject ID</TableCell>
                        <TableCell>Subject</TableCell>
                        <TableCell>Total Mark</TableCell>
                        <TableCell>Mark</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {submittedData.subject.map((subj) => (
                        <TableRow key={subj.subject_id}>
                          <TableCell>{subj.subject_id}</TableCell>
                          <TableCell>{subj.subject}</TableCell>
                          <TableCell>{subj.totalmark}</TableCell>
                          <TableCell>{subj.mark}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default SemesterForm;
