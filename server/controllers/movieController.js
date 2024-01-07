import Movie from "../models/Movie.js";
import Rating from '../models/Review.js'
import tmdb from "../api/tmdb.js";

import axios from "axios";
import Review from "../models/Review.js";


// create new movie
export const createMovie = async (req, res) => {
  const newMovie = new Movie(req.body);

  try {
    const savedMovie = await newMovie.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Successfully created",
        data: savedMovie,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to create. Try again.",
      });
  }
};

export const getMovies = (req,res) => {

  console.log(req.headers['authorization']);
  res.json({
    message : "These are the movies"
  });
}

export const getMovie = async (req,res , next) =>{
  const id = req.params.movieId;
console.log('id');
console.log(id);
  try {

    const response = await tmdb.get(`movie/${id}?language=en-US&append_to_response=credits`);
    // console.log(response.data);
    res.status(200).json({
      success : true,
      movie : response.data
    });
    
  } catch (error) {
    console.log(error.message);
    next(error);
  }
  
};

export const getReviews = async(req,res,next) => {

  const page = req.query.page;
  const id = req.params.movieId;

  try {
    const response = await tmdb.get(`movie/${id}/reviews?language=en-US&page=${page}`);
    res.status(200).json({
      success : true,
      reviews : response.data
    })
  } catch (error) {
    next(error)
  }


}

export const createReview = async(req,res,next) => {

console.log('body' , req.body);
const review = req.body.review;

const options = {
  method: 'POST',
  url: 'https://sentiment-analysis9.p.rapidapi.com/sentiment',
  headers: {
    'content-type': 'application/json',
    Accept: 'application/json',
    'X-RapidAPI-Key': '5847797dafmsha46e36f8b229352p1a99bbjsnc1dddc4c4f7a',
    'X-RapidAPI-Host': 'sentiment-analysis9.p.rapidapi.com'
  },
  data: [
    {
      id: '1',
      language: 'en',
      text: review
    }
  ]
};

try {
	const response = await axios.request(options);
  const prediction = response.data[0].predictions[0].prediction;
  let probability = response.data[0].predictions[0].probability;
  let rating = 0;

  console.log('res', response.data[0]);

// console.log('prediction ' , prediction);
// console.log('proba' , probability);
  if(prediction == 'positive')
  {
    rating = Math.ceil(((probability + 1)*5)*2)/2;
  }
  else if(prediction == 'negative')
  {
    let negScore = -probability;
    rating = Math.ceil(((negScore + 1)*5)*2)/2;
  }

  const reviewObj ={
    movieId : req.body.movieId,
    review : req.body.review,
    rating : rating
  }

  const newReview = new Review(reviewObj);

  const savedReview = await newReview.save();

  res.status(201).json({
    success : true,
    message : "Review Created",
    review : savedReview
  });

	
} catch (error) {
	console.error(error);
  next(error)
}


}