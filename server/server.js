import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import createHttpError from 'http-errors';
import movieRoute from './routes/movies.js'

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

// database connection
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

// for testing
app.get("/", (req, res) => {
  res.send("api is working");
});

// middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/movies', movieRoute);

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
  console.log("server listening on port: ", port);
});
