import React,{useState} from 'react'
import {Tabs , Tab ,AppBar, Box, Button, Toolbar , Typography} from '@mui/material' 
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
import {useDispatch} from "react-redux"
import { authActions } from '../store';

const Header = () => {

  const dispath = useDispatch();
  const [value , setValue] = useState();
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    
    <AppBar
    position='sticky' 
     sx={{background:'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,83,121,0.7906512946975666) 35%, rgba(127,144,7,0.7934524151457458) 46%, rgba(0,212,255,1) 100%)' }}>
      
      <Toolbar>
        
        <Typography variant="h4" >BlogsHub</Typography> 
        {
          isLoggedIn &&

        <Box display = "flex" marginLeft={'auto'} marginRight={'auto'} >

          <Tabs textColor ="inherit" value={value} onChange={(e , val) =>setValue(val)} >

            <Tab LinkComponent= {Link} to="/blogs" label="All Blogs"  />
            <Tab LinkComponent={Link} to="/myblogs" label="My Blogs"  />
            <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog"  />


          </Tabs>
        
        </Box>
        }
        
        <Box display="flex" marginLeft = "auto">
{         
          !isLoggedIn && 
          <>
          <Button LinkComponent= {Link} to="/auth" variant='contained' sx={{margin:1 , borderRadius: 10}} color="warning" >Rogin</Button>
          
          <Button LinkComponent= {Link} to="/auth" variant='contained' sx={{margin:1 , borderRadius: 10}} color = "warning">Signup</Button>
          </>
}
{         
          isLoggedIn &&
          <Button 
          onClick={() => dispath(authActions.logout())}
          LinkComponent= {Link} to="/auth" variant='contained' sx={{margin:1 , borderRadius: 10}} color = "warning">Log Out</Button>
}        

        </Box>

      </Toolbar>

    </AppBar>



  )
}

export default Header