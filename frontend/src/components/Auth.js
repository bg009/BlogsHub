import React,{useState} from 'react'
import {Box , Typography , TextField , Button} from '@mui/material';
import axios from "axios"
import {useDispatch} from "react-redux"
import { authActions } from '../store';
import {useNavigate} from "react-router-dom";

const Auth = () => {
  
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [inputs , setInputs] = useState({
    name : "",
    email: "",
    password: ""
  });

  const [isSignUp , setIsSignUp] = useState(false);

  const handleChange = (e) => {

    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))

  }

  const sendRequest =  async(type = "login") =>{

    const res = await axios.post(`http://localhost:5000/api/user/${type}` , {
      name : inputs.name,
      email : inputs.email,
      password : inputs.password
    }).catch((err) => console.log(err));

    
    const data = await res.data;
    console.log(data);
    return data;

  }



  const handleSubmit = (e) =>{

    e.preventDefault();
    console.log(inputs);

    //localstorage to save user's id in web browser (video - 2.42)
    if(isSignUp)
    sendRequest("signup").then((data) => localStorage.setItem("userId" , data.user._id)).then(() => dispath(authActions.login())).then(() => navigate("/blogs")).then(data => console.log(data));

    else
    sendRequest("login").then((data) => localStorage.setItem("userId" , data.user._id)).then(() => dispath(authActions.login())).then(() => navigate("/blogs")).then(data => console.log(data));

    //dispath is for updating the redux 
    //useNavigate will take you to link/allblogs
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>

        <Box maxWidth={400} display="flex" flexDirection='column' alignItems='center' justifyContent="center"  boxShadow="10px 10px 20px #ccc"
         padding={3} margin = 'auto' marginTop={5} borderRadius={5}>

          <Typography variant="h2" padding={3} textAlign="center" >

              {!isSignUp ? "Login" : "SignUp"}

          </Typography>
  { isSignUp   &&     <TextField name="name" value={inputs.name} placeholder="Name" margin='normal' onChange={handleChange} />
  }
          <TextField placeholder='Email' name="email" value={inputs.email} type={'email'} margin='normal' onChange={handleChange} />

          <TextField placeholder='Password' type={"password"} value={inputs.password} margin='normal' name="password" onChange={handleChange} />
          
          <Button sx={{borderRadius : 3 , marginTop: 3}} type="submit" color="warning" >Submit</Button>
          <Button onClick={() => setIsSignUp(!isSignUp)} sx={{borderRadius : 3 , marginTop:3}}  >

             Change to {isSignUp ? "Login" : "SignUp"}

          </Button>

        </Box>

      </form>






    </div>
  )
}

export default Auth
