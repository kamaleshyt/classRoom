import React, { useState } from 'react';
import '../index.style.css'
import axios from 'axios'
const api=axios.create({
       baseURL:'http://localhost:5010/signin'
})
const index = () => {
   const [value,setValue]=useState({email:'',password:''})

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
          <div class="login-box">
                <input type="email" 
                       class="email ele" 
                       name={'email'}
                        onChange={onChange}
                       placeholder="youremail@email.com"/>
                <input type="password"
                       class="password ele" 
                        name={'password'}
                        onChange={onChange}
                       placeholder="password"/>
                <button class="clkbtn" onClick={onSubmit}>Login</button>
            </div>
    </div>
  );
}

export default index;
