import jwt from 'jsonwebtoken';

// function that checks the token to access protected content/routes
const authenticateUser = (req, res, next) => {
    const cookie = req.headers.cookie;
    console.log(cookie);

    if (cookie) {
        const token = cookie.split('=')[1];

        try {
            const user = jwt.verify(token, 'LotsOfStreetsCatsAroundHere');
            req.user = user; // check variable names/object
            next()// make where this function goes
        }
        catch (err) {
            res.sendStatus(403)
            console.log(err)
            throw new Error;
        }
    }
    else {
        res.sendStatus(403)
    }
    
}

export { authenticateUser };