import pool from '../models/pool.js';
import { newConnection } from '../models/connection.js';
import { insertQuery, selectQuery } from '../models/queries.js';
import { hashPass, comparePass } from '../middleware/hashPass.js';

export const loginGet = async (req, res) => {
    res.send('mylogin get show me the login page')
}


// add token to POST login and signup
// distribute the route/page for authenticated user in login/signup
// ensure protected routes take the auth
export const loginPost = async (req, res) => {
    res.send('my login post');
    const { email, password } = req.body;
    
    try {
        const retrieveUserFromDb = await pool.query(selectQuery, ([email]))
                .then(result => {
                    const user = result.rows[0]
                    console.log(user);
                    const checkUser = comparePass(password, user.password)
                    if (checkUser) {
                        //send token
                    }
                    else {
                        res.redirect('/login');
                    }
                })
        res.status(200);
        
        
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
    // password hash here before making the query string or hashed in the function
    const hashedPassword = hashPass(password);
    console.log('password', hashedPassword);
    
    try {
        const newUser = await pool.query(insertQuery, ([username, email, hashedPassword]));
        res.status(200).json(res.body)
        console.log('newUser', newUser);
    }
    catch (err) {
        console.log('error', err)
    }
}