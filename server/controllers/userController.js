
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { authSchema } from '../util/validation_schema.js'
import createHttpError from "http-errors";

export const registerUser = async (req, res , next) => {

    try { 

        // const { email , password} = req.body;

        const result = await authSchema.validateAsync(req.body);

        const doesExist = await User.findOne({email : result.email});
        
        if(doesExist){
            throw createHttpError.Conflict(`${result.email} is already been registered`);
        }

        const hashedPassword = await bcrypt.hash(result.password, 10);

        const user = {
            email : result.email,
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

        if(error.isJoi === true) 
        {
            error.status = 422
        }
        
        next(error);

        // res.json({
        //     success : false,
        //     message : 'User creation failed',
        //     error : error
        // });
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

        const username = req.body.email;
        const authenticatedUser = {usename : username}
        const accessToken = jwt.sign(authenticatedUser, process.env.ACCESS_TOKEN_SECRET);

        res.json({
            success : true,
            message: 'Successfully Logged in',
            accessToken : accessToken
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