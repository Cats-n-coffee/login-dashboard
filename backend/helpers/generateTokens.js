import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

// Generates a token when POST /signup or POST /login
const generateToken = (email) => {
    return jwt.sign({ email }, process.env.TOKEN_SECRET, {
      expiresIn: 1800,
    });
};
  
const generateRefreshToken = (email) => {
    return jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
};

export { generateToken, generateRefreshToken }