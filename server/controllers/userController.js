
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { authSchema } from '../util/validation_schema.js'
import createHttpError from "http-errors";
import {signAccessToken , signRefreshToken , verifyRefreshToken} from '../util/jwt_helper.js'

export const registerUser = async (req, res , next) => {

    try { 

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

        try {

            const accessToken = signAccessToken(savedUser.id);
            const refreshToken = await signRefreshToken(savedUser.id);
    
            res.status(201).json({
                success : true,
                message : 'New user created',
                accessToken,
                refreshToken
        });
            
        } catch (error) {
            console.log(error.message);
            throw createHttpError.InternalServerError();
        }

        
      } catch (error) {

        if(error.isJoi === true) 
        {
            error.status = 422
        }
        
        next(error);

      }

}

export const loginUser = async (req, res , next) => {

    try {

        const result = await authSchema.validateAsync(req.body);

        const user = await User.findOne({email : result.email});

        if (user == null) {
          throw createHttpError.NotFound("User not registered");
        }

      if(await bcrypt.compare(result.password, user.password)) {

           
            try {
                const accessToken = signAccessToken(user.id);
                const refreshToken = await signRefreshToken(user.id);


                res.json({
                    success : true,
                    message: 'Successfully Logged ins',
                    accessToken : accessToken,
                    refreshToken :refreshToken
                });
                
            } catch (error) {
                console.log(error.message);
                throw createHttpError.InternalServerError();
            }
        
      } else {
        throw createHttpError.Unauthorized("Username or password not valid");
      }
    } catch (error) {
        
        if(error.isJoi === true) 
        {
            return next(createHttpError.BadRequest('Invalid Username or Password'));
        }
        
        next(error);
    }
  }

  export const refreshToken = async (req,res,next) => {

    try {

        const { refreshToken }= req.body;

        if(!refreshToken){
            throw createHttpError.BadRequest()
        }
        
       try {
        const userId = await verifyRefreshToken(refreshToken);

        console.log('before acc');
        const newAccessToken = signAccessToken(userId);
        console.log('after acc');
        const newRefreshToken =await signRefreshToken(userId);
        console.log('after refrs');

        res.json({
            accessToken : newAccessToken,
            refreshToken : newRefreshToken
        });

       } catch (error) {
        next(error);
       }
        

        
        
        
        
    } catch (error) {
        next(error)
    }

    
  }