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
            console.log('token verified')
            req.user = user;
            res.status(200);
            next()
        })

        // try {
        //     const user = jwt.verify(token, 'LotsOfStreetsCatsAroundHere');
        //     req.user = user; 
        //     next()// make sure where this function goes
        // }
        // catch (err) {
        //     res.status(403)
        //     console.log(err)
        //     throw new Error;
        // }
    }
    else {
        res.status(403).redirect('/login');
    }
    
}

export { authenticateUser };