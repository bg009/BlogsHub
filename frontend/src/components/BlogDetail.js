import {Button, Typography ,Box , InputLabel, TextField } from '@mui/material'
import React,{useEffect , useState} from 'react'
import {useParams , useNavigate} from "react-router-dom"
import axios from "axios"


const BlogDetail = () => {

  const navigate = useNavigate();
  const [inputs , setInputs] = useState();


  const [blog , setBlog] = useState();
  
  const id = useParams().id;

  const handleChange = (e) => {

    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  
  }
  

  const fetchDetails =  async() =>{

    const res = await axios.get(`http://localhost:5000/api/blog/${id}`).catch(err => console.log(err));

    const data = await res.data;
    return data;
 
  } 
  

  useEffect(() =>{

    fetchDetails().then((data) => {
      setBlog(data.blog)
      setInputs({title : data.blog.title , description : data.blog.description})
    })


  }  ,[id]);
 

  const sendRequest = async() =>{

    const res = await axios.put(`http://localhost:5000/api/blog/update/${id}` , {
      title: inputs.title,
      description: inputs.description
    }).catch((err) => console.log(err));

    
    const data = await res.data;
    return data;

  };


  const handleSubmit = (e) =>{

    e.preventDefault();
    sendRequest().then((data) =>data).then(() => navigate("/myBlogs/"));
  }; 
  



  return (
    <div>
{inputs && 
<form onSubmit={handleSubmit}>
        <Box border={3} borderColor="green" borderRadius={10} boxShadow="10px 10px 20px #ccc" padding ={3} margin={"auto"} marginTop={3} display="flex" flexDirection = "column" width="80%">
          <Typography fontWeight={'bold'} padding={3} color="grey" variant='h2' textAlign="center" >Post Your Blog</Typography>
          
          <InputLabel sx={{mb:1 , mt:2 , fontSize: '24px' , fontWeight:'bold'}} >Title</InputLabel>
          
          <TextField value={inputs.title} name="title" margin='normal' onChange={handleChange} variant = "outlined"/>
          
          <InputLabel sx={{mb:1 , mt:2 , fontSize: '24px' , fontWeight:'bold'}}>Description</InputLabel>
          
          <TextField value={inputs.description} 
          name="description" onChange={handleChange} margin='normal' variant = "outlined" />
          
          
          <Button sx={{mt:2 , borderRadius:4}} variant="contained" color="warning" type="submit">Submit</Button>

        </Box>
      </form>
}





    </div>
  )
}

export default BlogDetail