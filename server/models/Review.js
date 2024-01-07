
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    
    movieId : {
        type : String,
        required : true,
        unique : true
    },
    review : {
        type : String,
        required : true
    }
    ,
    rating : {
        type: Number,
        required : true
    }
});

export default mongoose.model("Review" , reviewSchema);