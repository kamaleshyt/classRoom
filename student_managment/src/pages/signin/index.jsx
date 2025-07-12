import React from 'react';

const index = () => {
  return (
    <div>
          <div class="login-box">
                <input type="email" 
                       class="email ele" 
                       placeholder="youremail@email.com"/>
                <input type="password"
                       class="password ele" 
                       placeholder="password"/>
                <button class="clkbtn">Login</button>
            </div>
    </div>
  );
}

export default index;
