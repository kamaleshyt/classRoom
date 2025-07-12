import React, { useState } from 'react';
import '../index.style.css'
import axios from 'axios'
const api=axios.create({
       baseURL:'http://localhost:5010/signup'
})

const index = () => {
       const [value,setValue]=useState({name:'',email:'',password:''})

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
         <div class="signup-box">
                <input type="text" 
                       class="name ele" 
                       name={'name'}
                       placeholder="Enter your name" value={value.name} onChange={onChange}/>
                <input type="email" 
                       class="email ele"
                       name={'email'} 
                       placeholder="youremail@email.com"
                       value={value.email}
                       onChange={onChange}
                       />
                <input type="password" 
                       class="password ele" 
                       name={'password'}
                       placeholder="password"
                       value={value.password}
                       onChange={onChange}
                       />
                <button class="clkbtn" onClick={onSubmit} >Signup</button>
            </div>
    </div>
  );
}

export default index;
