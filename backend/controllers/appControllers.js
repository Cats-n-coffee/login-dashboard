import pool from '../models/pool.js';
import { newConnection } from '../models/connection.js';
import { insertQuery, selectQuery } from '../models/queries.js';

export const loginGet = async (req, res) => {
    
}

export const loginPost = (req, res) => {
    res.send('my login post')
}

export const signUpGet = (req, res) => {
    res.send('my signup')
}

export const signUpPost = async (req, res) => {
    const { username, email, password } = req.body;
    // password hash here before making the query string or hashed in the function
    const newQueryString = insertQuery([username, email, password])
    
    try {
        const newUser = await newConnection(newQueryString);
    }
    catch (err) {
        console.log('error', err)
    }
}