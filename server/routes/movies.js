import express from "express";
import { createMovie } from "../controllers/movieController.js";

const router = express.Router()

// create new Movie
router.post('/create', createMovie)

export default router;