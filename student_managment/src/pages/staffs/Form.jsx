import React, { useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5010/stasffs',
});

const Form = () => {
  const [value, setValue] = useState({ name: '', subject: '' });

  const onSubmit = async () => {
    try {
      await api.post('', value);
      alert('Staff added successfully!');
    } catch (err) {
      console.log(err);
      alert('Error submitting staff details');
    }
  };

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  // All styles in one place
  const styles = {
    container: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to right, #6a11cb, #2575fc)',
      fontFamily: 'Arial, sans-serif',
    },
    box: {
      backgroundColor: '#fff',
      padding: '30px 40px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      minWidth: '350px',
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
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '14px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#6a11cb',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '15px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    table: {
      width: '100%',
    },
    td: {
      padding: '10px',
    },
    buttonContainer: {
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Add Staff</h2>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.td}><label>Staff Name:</label></td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="name"
                  value={value.name}
                  onChange={onChange}
                  placeholder="Enter Name"
                  style={styles.input}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.td}><label>Subject:</label></td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="subject"
                  value={value.subject}
                  onChange={onChange}
                  placeholder="Enter Subject"
                  style={styles.input}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={styles.buttonContainer}>
                <button style={styles.button} onClick={onSubmit}>
                  Add Staff
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Form;