import jwt from 'jsonwebtoken';

// function that checks the token to protected content/routes
const authenticateUser = (req, res, next) => {
    const cookie = req.headers.cookie;
    console.log(cookie);

    if (cookie) {
        const token = cookie.split('=')[1];

        jwt.verify(token, 'LotsOfStreetsCatsAroundHere', function(err, user) {
            if (err) {
                res.status(403)
                console.log('error verifying token', err);
            }
            else {
                console.log('token verified')
                req.user = user;
                res.status(200);
            }
            next()
        })
    }
    else {
        res.status(403).redirect('/login');
    }  
}

// verifies the refreshToken 
const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, 'MoreCatsAreHangingOut', function(err, result) {
            if (err) {
                return reject(err)
            }
            else {
                const userEmail = result.email;
                console.log(userEmail)
                return resolve(userEmail)
            }
        })
    })
}

export { authenticateUser, verifyRefreshToken };