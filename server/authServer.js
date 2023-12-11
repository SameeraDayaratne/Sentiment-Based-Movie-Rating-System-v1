import express from 'express'
import userRoute from './routes/users.js'
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import createHttpError from 'http-errors';
import './util/init_redis.js'


dotenv.config();
const app = express();
const port = process.env.AUTH_SERVER_PORT || 9000;

const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log("MongoDB database connected");
    } catch (error) {
      console.log("MongoDB database connection failed");
      
      
    }
  };

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use( '/users' , userRoute);

app.use(async (req,res,next) =>{

    next(createHttpError.NotFound());
})

app.use((err, req, res ,next)=>{

    res.status(err.status || 500);
    res.json({
        error: {
            status : err.status || 500,
            message : err.message
        }
    });
}
);


app.listen(port, () => {
    connect();
    console.log("Auth Server listening on port: ", port);
  });
  