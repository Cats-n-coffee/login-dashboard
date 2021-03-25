import bcrypt from 'bcrypt';

// this function hashes the password the user input at POST /signup
const hashPass = (password) => {
    const saltRounds = 10;
    // solution one: using the the hash funciton in a synchronous way
    return bcrypt.hashSync(password, saltRounds);

    // async callback returns null
    // bcrypt.hash(password, saltRounds, function(err, result) {
    //     if (err) {
    //         console.log('could not hash password');
    //         throw new Error('could not hash password');
    //     }
    //     console.log('hashed password')
    //     return result;
    // })

    // the second solution. using callback together with promise
    // we want the result(error or the data) for the promise, so we return a promise
    /*
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, result) {
            if (err) {
                console.log("could not hash password");
                reject("could not hash password");
            } else {
                resolve(result);
            }
            console.log("hashed password");
        });
    });
    */

    // this promise returns null
    // bcrypt.hash(password, saltRounds)
    // .then(result => {
    //     console.log(result)
    //     return result
    // })
    // .catch(err => console.log(err))

    // the third solution
    /*
     return bcrypt
        .hash(password, saltRounds)
        .then((result) => {
            console.log(result);
            return result;
        })
        .catch((err) => console.log(err));
    */

}

// this function compares the password with the hashed from the database, POST /login.
const comparePass = (password, hashedPassword) => {
    const checkPass = bcrypt.compareSync(password, hashedPassword);
    return checkPass;

    // console.log(password, hashedPassword)
    // bcrypt.compare(password, hashedPassword)
    // .then(result => {
    //     console.log('logged in promise');
    //     return result;
    // })
    // .catch(err => console.log(err))
}

export { hashPass, comparePass };
