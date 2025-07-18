
import { useMemo } from 'react';
import SideBar from './components/sidebar'
import { useGlobalContext } from './globalContext';
import DashBoard from './pages/dashBoard'
import Students from './pages/students'
import Staffs from './pages/staffs'
import Department from './pages/department'
import StudentMarks from './pages/studentMarks'
import Examination from './pages/examination'
import Subjects from './pages/subjects'
import { Box } from '@mui/material';

function App() {
   const {selectedTab}=useGlobalContext()  
   console.log(selectedTab)
   const selectedForm =useMemo(()=>{
    return [{name:'DashBoard',component:<DashBoard/>},
     {name: 'Department',component:<Department/>},
      {name:'Staffs',component:<Staffs/>},
     { name:'Students',component:<Students/>},
      {name:'Examination',component:<Examination/>},
     {name: 'Subject',component:<Subjects/>},
      {name:'Student Marks',component:<StudentMarks/>}]
      ?.find(val=>val.name===selectedTab)
   },[selectedTab])
  return (
    <Box>
      <Box sx={{width:"250px"}}><SideBar/></Box>
      <Box sx={{ml:"250px",}}> { selectedForm.component}</Box>
    
    </Box>
  );
}

export default App;



