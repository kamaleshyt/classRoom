import React, { useState } from 'react';
import '../index.style.css'
import axios from 'axios'
const api=axios.create({
       baseURL:'http://localhost:5010/department'
})
const index = () => {
   const [value,setValue]=useState({department_name:'',course_duration:'',duration_type:'',semester_count:'',Block:''})

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
        <center>
    <div>
          <div class="department-box">
                <input type="text"     
                          class="department_name ele" 
                          name={'department_name'}
                            onChange={onChange}
                          placeholder="Department Name"/><br/>
                <input type="text"
                          class="course_duration ele"   
                            name={'course_duration'}
                                onChange={onChange}
                            placeholder="Course Duration"/> <br/>   
                <input type="text"
                            class="duration_type ele"   
                                name={'duration_type'}
                                    onChange={onChange}
                                placeholder="Duration Type"/> <br/>
                <input type="number"
                            class="semester_count ele"   
                                name={'semester_count'}
                                    onChange={onChange}
                                placeholder="Semester Count"/> <br/>
                <input type="text"
                            class="Block ele"   
                                name={'Block'}
                                    onChange={onChange} 
                                placeholder="Block"/> <br/>
                <button class="clkbtn" onClick={onSubmit}>NEXT</button> 
            </div>
    </div>
        </center>
    );
}


export default index;
