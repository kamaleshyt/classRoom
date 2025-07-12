import React from 'react';
import '../index.style.css'

const index = () => {
  return (
    <div>
         <div class="signup-box">
                <input type="text" 
                       class="name ele" 
                       placeholder="Enter your name"/>
                <input type="email" 
                       class="email ele" 
                       placeholder="youremail@email.com"/>
                <input type="password" 
                       class="password ele" 
                       placeholder="password"/>
                <input type="password" 
                       class="password ele" 
                       placeholder="Confirm password"/>
                <button class="clkbtn">Signup</button>
            </div>
    </div>
  );
}

export default index;
