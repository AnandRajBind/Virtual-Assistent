import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import genToken from '../config/token.js';

// *******************************Signup controller*************************
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        //  password hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        // user creation
        const user = await User.create({
            name,
            password: hashedPassword,
            email
        });
        // token generation
        const token = await genToken(user._id);
        // set token  in cookies
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: false
        })
        return res.status(201).json({
            message: "User registered successfully", user
        });
    }
    catch (error) {
        return res.status(500).json({ message: `Signup Error: ${error.message}` });
    }
}



// **************************************************Login Controller******************************************* 

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Email does not exist" });
        }
        // password comparison
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // token generation
        const token = await genToken(user._id);
        // set token  in cookies
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: false
        })
        return res.status(201).json(user);
    }
    catch (error) {
        return res.status(500).json({ message: `Login Error: ${error.message}` });
    }
}
// **************************************Logout Controller**********************************************

export const logout=async (req,res)=>{
    try{
res.clearCookie("token");
return res.status(200).json({message:"Logged out successfully"});
    }
    catch(error){
        return res.status(500).json({ message: `Logout Error: ${error.message}` });
    }
}


