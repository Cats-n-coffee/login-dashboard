import jwt from 'jsonwebtoken';
// import cookieParser from 'cookie-parser';

import pool from '../models/pool.js';
import { insertQuery, selectQuery } from '../models/queries.js';
import { hashPass, comparePass } from '../helpers/hashPass.js';

// Generates a token when POST /signup or POST /login
const generateToken = (email) => {
    return jwt.sign({ email }, 'LotsOfStreetsCatsAroundHere', { expiresIn: 1800 })
}

export const loginGet = async (req, res) => {
    res.send('mylogin get show me the login page')
}

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
    
    try {
        const newUser = await pool.query(insertQuery, ([username, email, hashedPassword]));
        const token = generateToken(email)
        res.status(200).cookie('jwt', token).json(token)
        console.log('newUser', newUser);
    }
    catch (err) {
        if (err.code === '23505') {
            res.status(409).send('you already have an account') // error code 409 for conflict
        }
        console.log('error', err)
    }
}

export const dashboardGet = (req, res) => {
    res.send('dashboard')
}

export const logoutGet = (req, res) => {
    res.cookie('jwt', '', { maxAge: 0 }).redirect('/login');
}