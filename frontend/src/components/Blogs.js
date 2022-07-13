import React,{useEffect, useState} from 'react'
import axios from "axios";
import Blog from "./Blog"

const URL = "http://localhost:5000/api/blog"


const fetchHandler = async() =>{

  return await axios.get(URL).then((res) => res.data);

}


const Blogs = () => {
  
  const [blogs , setBlogs] = useState();  
  useEffect(() => {

    fetchHandler().then(data => setBlogs(data.blogs));

  } ,[]);
  
  //console.log(blogs);
  
  return (
  <>
  {  blogs  &&  blogs.map((blog , index) => (

      <Blog
      isUser = {localStorage.getItem("userId") === blog.user._id}   id={blog._id}
      title={blog.title} image={blog.image} description = {blog.description} userName = {blog.user.name}  />

    ))}

    </>
  )
}

export default Blogs