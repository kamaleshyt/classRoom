
import React, { useState } from 'react';
import { Autocomplete, Box, TextField, Button, Paper } from '@mui/material';

const Index = () => {
  const [value, setValue] = useState({
    name: '',
    departmentId: '',
    departmentName: '',
    DOB: '',
    rollNo: '',
    duration: '',
    address: {
      area: '',
      district: '',
      state: '',
    },
  });

  const departmentIdOptions = [111, 112, 113, 114, 115, 116, 117];

  const onChangeFunc = (e) => {
    const { name, value: inputValue } = e.target;

    if (['area', 'district', 'state'].includes(name)) {
      setValue((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: inputValue,
        },
      }));
    } else {
      setValue((prev) => ({
        ...prev,
        [name]: inputValue,
      }));
    }
  };

  const onAutocompleteChange = (_, newValue) => {
    setValue((prev) => ({
      ...prev,
      departmentId: newValue || '',
    }));
  };

  const onClick = () => {
    console.log(value);
    alert('Submitted! Check console for data.');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #6a11cb, #2575fc)',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 3,
          minWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <TextField
          name="name"
          value={value.name}
          onChange={onChangeFunc}
          label="Name"
        />
        <TextField
          name="rollNo"
          type="number"
          value={value.rollNo}
          onChange={onChangeFunc}
          label="Roll No"
        />
        <TextField
          name="DOB"
          type="date"
          value={value.DOB}
          onChange={onChangeFunc}
          InputLabelProps={{ shrink: true }}
          label="DOB"
        />
        <TextField
          name="departmentName"
          value={value.departmentName}
          onChange={onChangeFunc}
          label="Department Name"
        />
        <TextField
          name="area"
          value={value.address.area}
          onChange={onChangeFunc}
          label="Area"
        />
        <TextField
          name="district"
          value={value.address.district}
          onChange={onChangeFunc}
          label="District"
        />
        <TextField
          name="state"
          value={value.address.state}
          onChange={onChangeFunc}
          label="State"
        />
        <Autocomplete
          options={departmentIdOptions}
          value={value.departmentId}
          onChange={onAutocompleteChange}
          renderInput={(params) => (
            <TextField {...params} label="Department ID" />
          )}
        />
        <Button variant="contained" onClick={onClick}>
          Submit
        </Button>
      </Paper>
    </Box>
  );
};

export default Index;