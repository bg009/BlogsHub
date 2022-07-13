import express from "express";
import { getAllBlogs , addBlog , updateBlog ,deleteBlog ,getByID, getByUserId} from "../controllers/blog-controller";

const blogRouter = express.Router();

// http://localhost:5000/api/blog

blogRouter.get("/" , getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id" , updateBlog);
blogRouter.get("/:id" , getByID); 
blogRouter.delete("/:id" , deleteBlog);
blogRouter.get('/user/:id' , getByUserId);

export default blogRouter;