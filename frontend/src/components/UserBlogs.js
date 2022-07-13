import React,{useEffect , useState} from 'react'
import axios from "axios";
import Blog from "./Blog";


const UserBlogs = () => {
  
  const[user , setUser] = useState();
  const id = localStorage.getItem("userId");
  const URL =  `http://localhost:5000/api/blog/user/${id}`;
  
  const sendRequest = async() =>{

    return await axios.get(URL).catch(err => console.log(err)).then((res) => res.data);
  }



  useEffect(() => {

    sendRequest().then((data) => setUser(data.user));

  },[])  

  return (
    <>
  {  user  &&  user.blogs.map((blog , index) => (

      <Blog 
      isUser={true} id={blog._id}
      key={index} title={blog.title} image={blog.image} description = {blog.description} userName={user.name}   />

    ))}

    </>
  
  )
}

export default UserBlogs