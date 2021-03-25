import bcrypt from 'bcrypt';

// this function hashes the password the user input at POST /signup
const hashPass = (password) => {
    const saltRounds = 10;

    // synchronus
    const hashPass = bcrypt.hashSync(password, saltRounds);
    return hashPass;

    // async callback returns null
    // bcrypt.hash(password, saltRounds, function(err, result) {
    //     if (err) {
    //         console.log('could not hash password');
    //         throw new Error('could not hash password');
    //     }
    //     console.log('hashed password')
    //     return result;
    // })

    // this promise returns null
    // bcrypt.hash(password, saltRounds)
    // .then(result => {
    //     console.log(result)
    //     return result
    // })
    // .catch(err => console.log(err))
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

export { hashPass, comparePass }