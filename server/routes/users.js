import express from "express";
import {registerUser , loginUser, refreshToken , logoutUser} from '../controllers/userController.js'


const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser );

router.post("/refresh-token" , refreshToken);

router.delete("/logout" , logoutUser);

export default router;
