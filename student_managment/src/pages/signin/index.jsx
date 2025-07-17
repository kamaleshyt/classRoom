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

    <div className="container">
      <div className="slider"></div>
      
      <div className="btn">
        <button className="login">Login</button>
        <button className="signup">Signup</button>
      </div> 

      <div className="login-box">
        <input
          type="email"
          className="email ele"
          placeholder="youremail@email.com"
        />
        <input
          type="password"
          className="password ele"
          placeholder="password"
        />
        <button className="clkbtn">Login</button>
      </div>
    </div>
  );
};

export default index;


