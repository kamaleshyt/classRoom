import React, { useState } from 'react';
import '../index.style.css'
import { Box, Button, Dialog, Divider, IconButton, Table, Typography } from '@mui/material';
import Form from './Form';
import {Close} from '@mui/icons-material'
import BasicTable from './TableData';

const index = () => {
       const [isFormOpen,setIsFormOpen]=useState(false)
  return <Box>
       <Button onClick={()=>setIsFormOpen(true)} variant='contained' sx={{marginLeft:'auto'}}>Add</Button>
  <BasicTable/>
  <Dialog open={isFormOpen} maxWidth={'md'} fullWidth={true}>
       <Box sx={{height:'400px'}}>
              <Box sx={{display:'flex',m:2,justifyContent:'space-between'
                     ,alignItems:'center'}}>
                            <Typography sx={{fontSize:'1.3rem'}}>Add Staff</Typography>
              <IconButton onClick={()=>setIsFormOpen(false)}><Close/></IconButton> </Box>
             <Divider/>
             <Box sx={{m:2}}>
              <Form/></Box></Box></Dialog>
  </Box>
}

export default index;