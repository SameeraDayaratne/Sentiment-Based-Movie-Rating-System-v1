import express from "express";
import { createMovie, getMovies , getMovie , getReviews } from "../controllers/movieController.js";
import { verifyAccessToken} from '../util/jwt_helper.js'

const router = express.Router()

// Get Movies
router.get('/' ,verifyAccessToken, getMovies);
router.get('/getMovie/:movieId' , getMovie);
router.get('/getReviews/:movieId', getReviews);
// create new Movie
router.post('/create', verifyAccessToken, createMovie)


export default router;