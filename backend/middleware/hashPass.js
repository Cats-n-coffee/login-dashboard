import bcrypt from 'bcrypt';

const hashPass = (password) => {
    const saltRounds = 10;

    const hashPass = bcrypt.hashSync(password, saltRounds);
    return hashPass;

    // const hashedPass = bcrypt.hash(password, saltRounds)
    //                          .then(res => console.log(res))
    //                          .then(res => res)
    //                          .catch(err => console.log(err))
    // return hashedPass;
}
// TRY THIS
// var promise = checkUrlLink(send_to_url, event)
// .then(function(url_link) { 
//     console.log('URL LINK in promisse' + url_link); 
//     return clients.openWindow(url_link); 
// };

const comparePass = async (password, hashedPassword) => {
    const checkPass = bcrypt.compareSync(password, hashedPassword);
    return checkPass;
}

export { hashPass, comparePass }