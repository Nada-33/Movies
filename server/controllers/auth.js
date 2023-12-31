import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


//REGISTER USER 
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            
        });
        const savedUser = await newUser.save();

        res.status(201).json({ savedUser, message: 'sucess' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// login user
export const login = async (req, res) => {
    try {
        //check email
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "user does not exist!" });
        // console.log(user);
        //check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invaild credentials:password!" });
        //create token and delete password from db
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token,user,message: 'sucess'})
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
};