import express from "express";
import { createMovie, getMovies } from "../controllers/movieController.js";
import { verifyAccessToken} from '../util/jwt_helper.js'

const router = express.Router()

// Get Movies
router.get('/' ,verifyAccessToken, getMovies);
// create new Movie
router.post('/create', verifyAccessToken, createMovie)


export default router;