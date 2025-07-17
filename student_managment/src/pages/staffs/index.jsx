import React, { useState } from 'react';
import '../index.style.css'
import axios from 'axios'
const api=axios.create({
       baseURL:'http://localhost:5010/stasffs'
})

const index = () => {
       const [value,setValue]=useState({name:'',subject:''})

       const onSubmit=async()=>{
              try{
                     await api.post('',value)
              }catch(err){
                     console.log(err)
              }
       }
       const onChange=(e)=>{
setValue({...value,[e.target.name]:e.target.value})
       }
  return (
    <div>
            <div class="staff-box">
                    <input type="text" 
                         class="name ele" 
                         name={'name'}
                            onChange={onChange}
                         placeholder="Staff Name"/>
                    <input type="text"
                         class="subject ele" 
                            name={'subject'}
                            onChange={onChange}
                         placeholder="Subject"/>
                    <button class="clkbtn" onClick={onSubmit}>Add Staff</button>
                </div>
    </div>
  );
}

export default index;