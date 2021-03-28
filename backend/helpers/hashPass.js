import bcrypt from "bcrypt";

// this function hashes the password the user input at POST /signup
const hashPass = (password) => bcrypt.hashSync(password, 10);

// this function compares the password with the hashed from the database, POST /login.
const comparePass = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);

export { hashPass, comparePass };
