
import React, { useState } from 'react'
import {Autocomplete, Box,TextField,Button} from '@mui/material'

const index = () => {
    const [value,setValue]=useState({
        name:"",
        departmentId:"",
        departmentName:"",
        DOB:"",
        rollNo:"",
        duration:"",
        address: {
           area: "",
           district: "",
           state: ""
                 },

    })
    const onChangeFunc=(e)=>{
setValue({...value,[e.target.name]:e.target.value})
    }
    const onClick=()=>{

    }
  return (
 <Box sx={{display:'flex',flexDirection:'column'}}>
<TextField name={'name'} value={value.name} onChange={onChangeFunc} label={'Name'}/>
<TextField name={'rollNo'}  type="number" value={value.rollNo}  onChange={onChangeFunc} label={'rollNo'}/>
<TextField name={'DOB'} type="date" value={value.DOB} onChange={onChangeFunc} InputLabelProps={{shrink:true}} label={'DOB'}/>
<TextField name={'departmentName'} value={value.departmentName} onChange={onChangeFunc} label={'departmentName'}/>
<TextField name="area" value={value.address.area} onChange={onChangeFunc} label="Area" />
<TextField name="district" value={value.address.district} onChange={onChangeFunc} label="District" />
<TextField name="state" value={value.address.state} onChange={onChangeFunc} label="State" />
<Autocomplete sx={{marginTop:"10px"}} options={[111,112,113,114,115,116,117]} renderInput={(params) => <TextField {...params} label="departmentId" />} name={'subject'} value={value.subject} onChange={onChangeFunc}/>
<Button onClick={onClick}>Submit</Button>
 </Box>
  )
}

export default index 
