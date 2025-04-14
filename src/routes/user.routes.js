import express from 'express';
import { registerUser, loginUser, getMe, verifyUser, logoutUser,resetPassword,forgotPassword } from '../controllers/user.controllers.js';
import { isLoggedIn } from '../middleware/user.middleware.js';

 const userRouter = express.Router();

userRouter.post('/register', registerUser); // Keep /register for backward compatibility
userRouter.post('/signup', registerUser);   // Add /signup endpoint
userRouter.post('/login', loginUser);
userRouter.get('/logout', logoutUser);
userRouter.get('/me', isLoggedIn, getMe);
userRouter.get('/verify/:token', verifyUser);
userRouter.get('/verify/:token', verifyUser);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post("/reset-password/:token", resetPassword)

export default userRouter;