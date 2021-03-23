const insertQuery = ([...values]) => {
    return `INSERT INTO users ${values[0]}, ${values[1]}, ${values[2]}`;
};

const selectQuery = ([...values]) => {
    return `SELECT ${values[0]}, ${values[1]} FROM users WHERE ${values[0]}`;
};

export { insertQuery, selectQuery };