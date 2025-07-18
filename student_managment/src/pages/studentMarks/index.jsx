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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 850,
          backgroundColor: "#fff",
          borderRadius: 3,
          boxShadow: 5,
          p: 4,
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 3, textAlign: "center", fontWeight: 600, color: "#1976d2" }}
        >
          Semester & Subject Entry Form
        </Typography>

        <TextField
          fullWidth
          label="Semester"
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Department ID"
          name="department_id"
          value={formData.department_id}
          onChange={handleChange}
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
          <InputLabel>Department Name</InputLabel>
          <Select
            name="department_name"
            value={formData.department_name}
            onChange={handleChange}
            label="Department Name"
          >
            <MenuItem value="">
              <em>-- Select Department --</em>
            </MenuItem>
            <MenuItem value="ECE">ECE</MenuItem>
            <MenuItem value="CSE">CSE</MenuItem>
            <MenuItem value="EEE">EEE</MenuItem>
            <MenuItem value="MECH">MECH</MenuItem>
            <MenuItem value="CIVIL">CIVIL</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
          Subject Details
        </Typography>

        {formData.subject.map((subj, index) => (
          <Box
            key={subj.subject_id}
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              mb: 2,
              flexWrap: "wrap",
            }}
          >
            <TextField
              label="Subject"
              name="subject"
              value={subj.subject}
              onChange={(e) => handleSubjectChange(index, e)}
              variant="outlined"
            />
            <TextField
              label="Total Mark"
              name="totalmark"
              value={subj.totalmark}
              onChange={(e) => handleSubjectChange(index, e)}
              variant="outlined"
            />
            <TextField
              label="Mark"
              name="mark"
              value={subj.mark}
              onChange={(e) => handleSubjectChange(index, e)}
              variant="outlined"
            />
            <IconButton onClick={() => removeSubject(index)} color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 3 }}>
          <Button variant="outlined" onClick={addSubject}>
            + Add Subject
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>

        {submittedData && (
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Typography
              variant="h6"
              sx={{ p: 2, bgcolor: " #6a11cb, #2575fc", fontWeight: 600 }}
            >
              Submitted Semester Summary
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Semester</TableCell>
                  <TableCell>Dept. ID</TableCell>
                  <TableCell>Dept. Name</TableCell>
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
                          <TableCell>Total</TableCell>
                          <TableCell>Mark</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {submittedData.subject.map((s) => (
                          <TableRow key={s.subject_id}>
                            <TableCell>{s.subject_id}</TableCell>
                            <TableCell>{s.subject}</TableCell>
                            <TableCell>{s.totalmark}</TableCell>
                            <TableCell>{s.mark}</TableCell>
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
    </Box>
  );
};

export default SemesterForm;