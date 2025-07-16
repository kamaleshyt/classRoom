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

    <>
      {/* container div */}
      <div className="container">

        {/* upper button section to select
            the login or signup form */}
        <div className="slider"></div>
        <div className="btn">
          <button className="login">Login</button>
          <button className="signup">Signup</button>
        </div>
        
        <div>
          <div className="signup-box">
            <input
              type="text"
              className="name ele"
              placeholder="Enter your name"
            />
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
            <input
              type="password"
              className="password ele"
              placeholder="Confirm password"
            />
            <button className="clkbtn">Signup</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default index;