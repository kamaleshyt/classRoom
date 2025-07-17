import React from 'react'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import InboxIcon from '@mui/icons-material/Inbox'
import MailIcon from '@mui/icons-material/Mail'
import { useGlobalContext } from '../../globalContext';

const index = (props) => {
    const sideBarArr=['DashBoard','Department','Staffs','Students','Examination','Subject','Student Marks']
    const {setSelectedTab}=useGlobalContext()  
    const list = () => (
    <Box
      sx={{ width:  250 }}
      role="presentation"
    >
      <List>
        {sideBarArr.map((text, index) => (
          <ListItem key={text} disablePadding onClick={()=>setSelectedTab(text)}>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon/> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
     return (
    <div>
       <Drawer
      anchor={'left'}
      open={true}
          variant="permanent"
    >
      {list()}
    </Drawer>
    </div>
  )
}

export default index
