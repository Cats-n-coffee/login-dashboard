import dotenv from "dotenv";
import fs from "fs";
import jwt from "jsonwebtoken";
import { comparePass, hashPass } from "../helpers/hashPass.js";
import { verifyRefreshToken } from "../middleware/authentication.js";
import pool from "../models/pool.js";
import {
  deleteToken, insertQuery,
  selectQuery,

  selectToken, updateWithToken
} from "../models/queries.js";
// import graphData from '../datasets/data-graphs.json';
// import tableData from '../datasets/data-table.json';

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

//Controllers for all routes
export const loginGet = async (req, res) => {
  res.send("mylogin get show me the login page");
};

export const loginPost = (req, res) => {
  const { email, password } = req.body;
  //   as we don't need data by waiting something, so we return the promise directly here
  return pool
    .query(selectQuery, [email])
    .then(async (result) => {
      const user = result.rows[0];
      console.log(user);
      const checkUser = comparePass(password, user.password);
      if (checkUser) {
        const token = generateToken(email);
        const refreshToken = generateRefreshToken(email);
        // usually, we wrap the data with a json object, as when user login un, we may need to return
        // user's email, username stuff back to frontend side
        await pool.query(updateWithToken, [refreshToken, email]);
        res
          .status(200)
          .cookie("jwt", token, { maxAge: 1801, httpOnly: true })
          .cookie("refresh_token", refreshToken, {
            maxAge: 604800,
            httpOnly: true,
          })
          .json({ email, username, token, refreshToken });
        
      } else {
        res.status(403).json({ msg: "Invalid authentication data" });
      }
    })
    .then((insertedToken) => insertedToken)
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
    const addRefreshToken = await pool.query(updateWithToken, [
      refreshToken,
      email,
    ]);

    res
      .status(200)
      .cookie("jwt", token, { maxAge: 1801, httpOnly: true })
      .cookie("refresh_token", refreshToken, { maxAge: 604800, httpOnly: true })
      .json({ email, username, token, refreshToken });

    console.log("newUser", newUser);
  } catch (err) {
    if (err.code === "23505") {
      res.status(409).send("you already have an account"); // error code 409 for conflict
    }
    console.log("error", err);
  }
};

export const dashboardGet = (req, res) => {
  try {
    const graphFile = fs.readFileSync("../datasets/data-graphs.json", "utf-8");
    //const graphData = JSON.parse(graphFile);

    res.json({ graphFile });
  } catch (err) {}
};

export const logoutGet = async (req, res) => {
  const { email } = req.headers;

  try {
    if (email) {
      await pool.query(deleteToken, [email]);
      res.status(200)
        .cookie("jwt", "", { maxAge: 0 })
        .cookie("refresh_token", "", { maxAge: 0 })
        .send('logged out');
    }
    else {
      res.status(405).send('not for you')
    }
  }
  catch (err) {
    res.status(404).send('nope')
  }
};

export const refreshTokenPost = (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) {
    res.status(403);
  } else {
    return pool
      .query(selectToken, [refresh_token])
      .then((result) => {
        const token = result.rows[0].refresh_token;
        return verifyRefreshToken(token);
      })
      .then((userEmail) => {
        const newToken = generateToken(userEmail);
        res.cookie("jwt", newToken).json({ newToken });
      })
      .catch((err) => console.log(err));
  }
};
