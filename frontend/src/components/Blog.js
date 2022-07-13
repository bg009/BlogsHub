import React from 'react'
import {Box, Avatar , CardContent , CardHeader , CardMedia , IconButton, Typography , Card} from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from "react-router-dom";
import axios from "axios"


const Blog = ({title , description , image , userName ,isUser , id}) => {


  const navigate = useNavigate();
  const handleEdit = (e) =>{
    navigate(`/myblogs/${id}`)
  }

  //just like sendRequest
  const deleteRequest = async() =>{

    const res = await axios.delete(`http://localhost:5000/api/blog/${id}`).catch((err) => console.log(err));

    const data = await res.data;
    return data;

  }

  const handleDelete = (e) =>{

     deleteRequest().then(() => navigate("/")).then(() => navigate("/blogs"));
    //did navigation as earlier after deleting change was not shown until refreshed now it will navigate to some page then again to /blogs page
  }

  return (
    <div>
      

      <Card sx={{ maxWidth: 345 , margin:"auto" , width:"40%" , mt:2 , padding: 2 , boxShadow: "5px 5px 10px #ccc" ,
       ":hover:":{boxShadow: "10px 10px 20px #ccc"
      }}}>
      
      {
        isUser && 
        (
          <Box display="flex">
            <IconButton sx={{marginLeft: 'auto'}}
             onClick={handleEdit} ><EditIcon color="warning" /></IconButton>
            
            <IconButton onClick={handleDelete} ><DeleteIcon color="warning"  /></IconButton>

          </Box>
        )


      }

      

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
            {userName.charAt(0)}
          </Avatar>
        }
        title={title}
      />
      <CardMedia
        component="img"
        height="194"
        image= {image}
        alt={userName}
      />

          

      <CardContent>
        <hr />
        <br />
        <Typography variant="body2" color="text.secondary">
          <b>{userName}</b> {description}
        </Typography>
      </CardContent>
    </Card>
      

    </div>
  )
}

export default Blog





