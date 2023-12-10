
import bcrypt from "bcrypt";
import User from "../models/User.js";

export const registerUser = async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = {
            email : req.body.email,
            password : hashedPassword
        }

        const newUser = new User(user);
        const savedUser = await newUser.save();
    
        res.status(201).json({
            success : true,
            message : 'New user created',
            data : savedUser
        });
      } catch (error) {
        res.status(500).json({
            success : false,
            message : 'User creation failed',
            error : error
        });
      }

}

export const loginUser = async (req, res) => {

    try {

        const user = await User.findOne({email : req.body.email});

        if (user == null) {
          return res.status(400).json({
            success : false,
            message: 'Could not find user',
        });;
        }

      if(await bcrypt.compare(req.body.password, user.password)) {
        res.json({
            success : true,
            message: 'Successfully Logged in',
        });
      } else {
        res.json({
            success : false,
            message: 'Incorrect Password',
        });
      }
    } catch (error) {
      res.status(500).json({
        success : false,
        message: 'Server Error',
        error : error
    });
    }
  }