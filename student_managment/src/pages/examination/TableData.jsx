import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';

const TableData = ({ data }) => {
  if (!data) return null;

  return (
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
            <TableCell>{data.studentName}</TableCell>
            <TableCell>{data.rollNumber}</TableCell>
            <TableCell>{data.subjectName}</TableCell>
            <TableCell>{data.subjectCode}</TableCell>
            <TableCell>{data.examDate}</TableCell>
            <TableCell>{data.details}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableData;