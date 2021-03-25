// the two queries used: insert when making POST to /signup, select when making POST to /login.
const insertQuery = `INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *`;

const selectQuery = `SELECT * FROM users WHERE email = $1`;

export { insertQuery, selectQuery };