import jwt from "jsonwebtoken";
import { comparePass, hashPass } from "../helpers/hashPass.js";
import pool from "../models/pool.js";
import { insertQuery, selectQuery, updateWithToken, selectToken, deleteToken } from "../models/queries.js";
import { verifyRefreshToken } from '../middleware/authentication.js';

// Generates a token when POST /signup or POST /login
const generateToken = (email) => {
  return jwt.sign({ email }, "LotsOfStreetsCatsAroundHere", {
    expiresIn: 1800
  });
};

const generateRefreshToken = (email) => {
    return jwt.sign({ email }, "MoreCatsAreHangingOut", {
        expiresIn: '7d'
      });
}

export const loginGet = async (req, res) => {
  res.send("mylogin get show me the login page");
};

export const loginPost = (req, res) => {
  const { email, password } = req.body;
  //   as we don't need data by waiting something, so we return the promise directly here
  return pool
    .query(selectQuery, [email])
    .then((result) => {
      const user = result.rows[0];
      console.log(user);
      const checkUser = comparePass(password, user.password);
      if (checkUser) {
        const token = generateToken(email);
        const refreshToken = generateRefreshToken(email);
        // usually, we wrap the data with a json object, as when user login un, we may need to return 
        // user's email, username stuff back to frontend side
        res.status(200)
           .cookie("jwt", token)
           .cookie("refresh_token", refreshToken)
           .json({ token, refreshToken });
        return pool.query(updateWithToken, [refreshToken, email])
      } else {
        res.status(403).json({ msg: "Invalid authentication data" });
      }
    })
    .then(insertedToken => insertedToken) 
    .catch((e) => {
      res.status(500).json({ msg: JSON.stringify(e) });
    });
};

export const signUpGet = (req, res) => {
  res.send("my signup show me the signup page");
};

export const signUpPost = async (req, res) => {
  const { username, email, password } = req.body;

  // password hash here before making the query string
  const hashedPassword = hashPass(password);

  try {
    const newUser = await pool.query(insertQuery, [
      username,
      email,
      hashedPassword,
    ]);
    const token = generateToken(email);
    const refreshToken = generateRefreshToken(email);
    res.status(200)
       .cookie("jwt", token)
       .cookie("refresh_token", refreshToken)
       .json({ token, refreshToken});
    const addRefreshToken = await pool.query(updateWithToken, [refreshToken, email]); // does this need to be done earlier ? (would it slow down the response to frontend)
    console.log("newUser", newUser);
  } catch (err) {
    if (err.code === "23505") {
      res.status(409).send("you already have an account"); // error code 409 for conflict
    }
    console.log("error", err);
  }
};

export const dashboardGet = (req, res) => {
  res.send("dashboard");
};

export const logoutGet = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 })
     .cookie("refresh_token", "", { maxAge: 0 });
  return pool.query(deleteToken, [req.body.email])
             .then(res => res)
             .catch(err => console.log(err))

};

export const refreshTokenPost = (req, res) => {
    const { refresh_token } = req.body;
    if (!refresh_token) {
      res.status(403);
    }
    else {
      return pool.query(selectToken, [refresh_token])
                 .then(result => {
                    const token = result.rows[0].refresh_token;
                    return verifyRefreshToken(token);
                 })
                 .then((userEmail) => {
                    const newToken = generateToken(userEmail);
                    res.cookie("jwt", newToken).json({ newToken }) 
                 })
                 .catch(err => console.log(err))
    }
}
