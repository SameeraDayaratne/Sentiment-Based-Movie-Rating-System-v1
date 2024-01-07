
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    
    movieId : {
        type : String,
        required : true,
        
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
},
{ timestamps: true }
);

export default mongoose.model("Review" , reviewSchema);