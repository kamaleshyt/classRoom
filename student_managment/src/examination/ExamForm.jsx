import React, { useState } from 'react';
import './ExamForm.css'; 
import axios from 'axios'
const api=axios.create({
       baseURL:'http://localhost:5010/exam
       '
})

const ExamForm = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can replace this with real submission logic
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
    setFormData({
      studentName: '',
      rollNumber: '',
      subjectName: '',
      subjectCode: '',
      examDate: '',
      details: '',
    });
  };

  return (
    <div className="exam-form-background">
      <h2>Student Examination Subject Details Form</h2>
      <form onSubmit={handleSubmit} className="exam-form">
        <label htmlFor="studentName">Student Name</label>
        <input
          type="text"
          id="studentName"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          required
        />

        <label htmlFor="rollNumber">Roll Number</label>
        <input
          type="text"
          id="rollNumber"
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleChange}
          required
        />

        <label htmlFor="subjectName">Subject Name</label>
        <input
          type="text"
          id="subjectName"
          name="subjectName"
          value={formData.subjectName}
          onChange={handleChange}
          required
        />

        <label htmlFor="subjectCode">Subject Code</label>
        <input
          type="text"
          id="subjectCode"
          name="subjectCode"
          value={formData.subjectCode}
          onChange={handleChange}
        />

        <label htmlFor="examDate">Examination Date</label>
        <input
          type="date"
          id="examDate"
          name="examDate"
          value={formData.examDate}
          onChange={handleChange}
        />

        <label htmlFor="details">Additional Details</label>
        <textarea
          id="details"
          name="details"
          rows="4"
          value={formData.details}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ExamForm;