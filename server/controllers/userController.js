
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { authSchemaSignIn ,authSchemaLogIn } from '../util/validation_schema.js'
import createHttpError from "http-errors";
import {signAccessToken , signRefreshToken , verifyRefreshToken} from '../util/jwt_helper.js'
import client from "../util/init_redis.js";

export const registerUser = async (req, res , next) => {

    try { 

        const result = await authSchemaSignIn.validateAsync(req.body);

        const doesExist = await User.findOne({email : result.email});
        
        if(doesExist){
            throw createHttpError.Conflict(`${result.email} is already been registered`);
        }

        const hashedPassword = await bcrypt.hash(result.password, 10);

        console.log('fname');
        console.log(result.firstName);

        const user = {
            firstName: result.firstName,
            lastName: result.lastName,
            email : result.email,
            password : hashedPassword
        }

        const newUser = new User(user);
        const savedUser = await newUser.save();

               res.status(201).json({
                success : true,
                message : 'New user created'
                
        });


        // try {

        //     const accessToken = signAccessToken(savedUser.id);
        //     const refreshToken = await signRefreshToken(savedUser.id);
    
        //     res.status(201).json({
        //         success : true,
        //         message : 'New user created',
        //         accessToken,
        //         refreshToken
        // });

       
            
        // } catch (error) {
        //     console.log(error.message);
        //     throw createHttpError.InternalServerError();
        // }
       
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

        const result = await authSchemaLogIn.validateAsync(req.body);


        const user = await User.findOne({email : result.email});

        if (user == null) {
          throw createHttpError.NotFound("User not registered");
        }
        const { password:password , ...rest}= user._doc;

       
        

      if(await bcrypt.compare(result.password, user.password)) {

           
            try {
                const accessToken = signAccessToken(user.id);
                const refreshToken = await signRefreshToken(user.id);



                res.cookie('jwt' , refreshToken , {
                    httpOnly : true,
                    sameSite: 'none',
                    secure : true,
                    
                    
                }).json({
                    success : true,
                    message: 'Successfully Logged ins',
                    accessToken : accessToken,
                    user : rest
                    
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
        // console.log('cookies');
        // console.log(req.cookies.jwt);
        const  refreshToken = req.cookies.jwt;
        
        if(!refreshToken){
            throw createHttpError.BadRequest()
        }
        
       try {
        const userId = await verifyRefreshToken(refreshToken);

        const newAccessToken = signAccessToken(userId);
        const newRefreshToken =await signRefreshToken(userId);

        res.cookie('jwt' , newRefreshToken , {
            httpOnly : true,
            sameSite: 'none',
            secure : true,
            
            
        }).json({
            success : true,
            message: 'Successfully Refreshed Tokens',
            accessToken : newAccessToken,    
            
        });

       } catch (error) {
        
        next(error);
       }
  
    } catch (error) {
        next(error)
    }

  }

  export const logoutUser = async (req,res,next) => {

    try {

        const refreshToken = req.cookies.jwt;
        if(!refreshToken) throw createHttpError.BadRequest();

        const userId = await verifyRefreshToken(refreshToken);

        try {
           const val = await client.DEL(userId);
           res.clearCookie('jwt').sendStatus(204);
        } catch (error) {
            console.log(error.message);
            throw createHttpError.InternalServerError();
        }
              
    } catch (error) {
        next(error)
    }

  }