import {Button, Typography ,Box , InputLabel, TextField } from '@mui/material'
import React,{useState} from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"

const AddBlog = () => {
  
  const navigate = useNavigate();

  const [inputs , setInputs] = useState({
    title : "",
    description: "",
    image: ""
  });

  const handleChange = (e) => {

    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))

  }

  const sendRequest =  async() =>{

    const res = await axios.post("http://localhost:5000/api/blog/add" , {
      title : inputs.title,
      description : inputs.description,
      image : inputs.image,
      user: localStorage.getItem("userId")
    }).catch((err) => console.log(err));

    
    const data = await res.data;
    console.log(data);
    return data;

  }

  const handleSubmit = (e) =>{

    e.preventDefault();
    sendRequest().then(data => console.log(data)).then(() =>  navigate("/blogs"));

  }

  
  return (
    <div>

      <form onSubmit={handleSubmit}>
        <Box border={3} borderColor="green" borderRadius={10} boxShadow="10px 10px 20px #ccc" padding ={3} margin={"auto"} marginTop={3} display="flex" flexDirection = "column" width="80%">
          <Typography fontWeight={'bold'} padding={3} color="grey" variant='h2' textAlign="center" >Post Your Blog</Typography>
          
          <InputLabel sx={{mb:1 , mt:2 , fontSize: '24px' , fontWeight:'bold'}} >Title</InputLabel>
          
          <TextField value={inputs.title} name="title" margin='normal' onChange={handleChange} variant = "outlined"/>
          
          <InputLabel sx={{mb:1 , mt:2 , fontSize: '24px' , fontWeight:'bold'}}>Description</InputLabel>
          
          <TextField value={inputs.description} 
          name="description" onChange={handleChange} margin='normal' variant = "outlined" />
          
          <InputLabel sx={{mb:1 , mt:2 , fontSize: '24px' , fontWeight:'bold'}}>ImageURL</InputLabel>
          
          <TextField name='image' value = {inputs.image}
          onChange={handleChange} margin='normal' variant =   "outlined" />

          <Button sx={{mt:2 , borderRadius:4}} variant="contained" color="warning" type="submit">Submit</Button>

        </Box>
      </form>



    </div>
  )
}

export default AddBlog