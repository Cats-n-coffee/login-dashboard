import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// function that checks the token to protected content/routes
const authenticateUser = (req, res, next) => {
    const cookie = req.headers;
    console.log(cookie);

    // if (cookie) {
    //     const token = cookie.split('=')[1];

    //     jwt.verify(token, process.env.TOKEN_SECRET, function(err, user) {
    //         if (err) {
    //             res.status(403)
    //             console.log('error verifying token', err);
    //         }
    //         else {
    //             console.log('token verified')
    //             req.user = user;
    //             res.status(200);
    //         }
    //         next()
    //     })
    // }
    // else {
    //     res.status(403).redirect('/login');
    // }  
}

// verifies the refreshToken 
const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, function(err, result) {
            if (err) {
                return reject(err)
            }
            else {
                const userEmail = result.email;
                console.log('verified', userEmail)
                return resolve(userEmail)
            }
        })
    })
}

export { authenticateUser, verifyRefreshToken };