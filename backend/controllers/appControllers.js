import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import pool from '../models/pool.js';
import { newConnection } from '../models/connection.js';
import { insertQuery, selectQuery } from '../models/queries.js';
import { hashPass, comparePass } from '../helpers/hashPass.js';

const generateToken = (email) => {
    return jwt.sign({ email }, 'LotsOfStreetsCatsAroundHere', { expiresIn: 1800 })
}

export const loginGet = async (req, res) => {
    res.send('mylogin get show me the login page')
}


// add token to POST login and signup
// distribute the route/page for authenticated user in login/signup
// ensure protected routes take the auth
export const loginPost = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const retrieveUserFromDb = await pool.query(selectQuery, ([email]))
                .then(result => {
                    const user = result.rows[0]
                    console.log(user);
                    const checkUser = comparePass(password, user.password)
                    if (checkUser) {
                        const token = generateToken(email);
                        res.status(200).cookie('jwt', token).json(token);   
                    }
                    else {
                        res.redirect('/login');
                    }
                })        
        
    }
    catch (err) {
        console.log(err)
    }
}

export const signUpGet = (req, res) => {
    res.send('my signup show me the signup page')
}

export const signUpPost = async (req, res) => {
    const { username, email, password } = req.body;

    // password hash here before making the query string
    const hashedPassword = hashPass(password);
    console.log('password', hashedPassword);
    
    try {
        const newUser = await pool.query(insertQuery, ([username, email, hashedPassword]));
        const token = generateToken(email)
        res.status(200).cookie('jwt', token).json(token)
        console.log('newUser', newUser);
    }
    catch (err) {
        console.log('error', err)
    }
}

export const dashboardGet = (req, res) => {
    res.send('dashboard')
}