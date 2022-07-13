import express from "express";
//es6 can be used if in package.json (start)
import mongoose from "mongoose"
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
import cors from "cors"

const app = express();

app.use(cors());
app.use(express.json());
app.use( "/api/user" , router);//http://localhost:5000/api/user will be the main url after this every url from the router can be used to reach that page 
//middleware
app.use("/api/blog" , blogRouter);


//QvRgjUigewyULMtk

mongoose.connect('mongodb+srv://admin:QvRgjUigewyULMtk@cluster0.yxfyv.mongodb.net/Blog?retryWrites=true&w=majority')
.then(() => app.listen(5000))
.then(() => console.log("Connected to Database and Listening to LocalHost:5000"))
.catch((err) =>{
    console.log(err);
});

//promise 
