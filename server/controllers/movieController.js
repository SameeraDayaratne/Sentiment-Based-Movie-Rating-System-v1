import Movie from "../models/Movie.js";


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
