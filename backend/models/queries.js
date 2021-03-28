// the two queries used: insert when making POST to /signup, select when making POST to /login.
const insertQuery = `INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *`;

const selectQuery = `SELECT * FROM users WHERE email = $1`;

const updateWithToken = `UPDATE users SET refresh_token = $1 WHERE email = $2`;

const selectToken = `SELECT * FROM users WHERE refresh_token = $1`;

const deleteToken = `UPDATE users SET refresh_token = null WHERE email = $1`;

export { insertQuery, selectQuery, updateWithToken, selectToken, deleteToken };