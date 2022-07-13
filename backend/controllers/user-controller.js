import User from "../model/User";
import bycrypt from "bcryptjs" ;
//bycrpt is used for hashing 
export const getAllUser = async(req , res , next) => {

    let users;
    try{
        users = await User.find();
    } catch(err){
        console.log(err);
    }


    if(!users){
        return res.status(404).json({message : "No users found"});
    }

    return res.status(200).json({users});


};


export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
    } catch (err) {
       return console.log(err);
    }
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User Already Exists! Login Instead" });
    }
    
    const hashedPassword = bycrypt.hashSync(password);

    const user = new User({
      name,
      email,
      password : hashedPassword,
      blogs: [],
    });
  
    
    try {
      await user.save();
    } catch (err) {
       return console.log(err);
    }
    return res.status(201).json({ user });
  };


export const login = async(req , res , next) => {

    const {email, password } = req.body;
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
    } catch (err) {
       return console.log(err);
    }
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "Could not find User with this id" });
    }
    
    const isPasswordCorrect = bycrypt.compareSync(password , existingUser.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message : "Incorrect Password"});
    }

    return res.status(200).json({message: "login successful" , user : existingUser});

}


















