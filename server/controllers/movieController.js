import Movie from "../models/Movie.js";
import tmdb from "../api/tmdb.js";


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
