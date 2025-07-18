import React, { useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5010/department',
});

const Index = () => {
  const [value, setValue] = useState({
    department_name: '',
    course_duration: '',
    duration_type: '',
    semester_count: '',
    Block: '',
  });

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      await api.post('', value);
      alert('Department submitted successfully!');
    } catch (err) {
      console.error(err);
      alert('Submission failed!');
    }
  };

  // Styles as JS objects
  const styles = {
    mainContainer: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to right, #6a11cb, #2575fc)',
      fontFamily: 'Segoe UI, sans-serif',
    },
    box: {
      backgroundColor: '#fff',
      padding: '30px 40px',
      borderRadius: '15px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      width: '400px',
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '8px',
      marginTop: '4px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '14px',
    },
    button: {
      marginTop: '15px',
      padding: '10px 20px',
      backgroundColor: '#6a11cb',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#2575fc',
    },
    table: {
      width: '100%',
    },
    cell: {
      padding: '10px 5px',
    },
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.box}>
        <h2 style={styles.title}>Department Entry</h2>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.cell}><label>Department Name:</label></td>
              <td style={styles.cell}><input type="text" name="department_name" onChange={onChange} style={styles.input} /></td>
            </tr>
            <tr>
              <td style={styles.cell}><label>Course Duration:</label></td>
              <td style={styles.cell}><input type="text" name="course_duration" onChange={onChange} style={styles.input} /></td>
            </tr>
            <tr>
              <td style={styles.cell}><label>Duration Type:</label></td>
              <td style={styles.cell}><input type="text" name="duration_type" onChange={onChange} style={styles.input} /></td>
            </tr>
            <tr>
              <td style={styles.cell}><label>Semester Count:</label></td>
              <td style={styles.cell}><input type="number" name="semester_count" onChange={onChange} style={styles.input} /></td>
            </tr>
            <tr>
              <td style={styles.cell}><label>Block:</label></td>
              <td style={styles.cell}><input type="text" name="Block" onChange={onChange} style={styles.input} /></td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: 'center' }}>
                <button style={styles.button} onClick={onSubmit}>NEXT</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;