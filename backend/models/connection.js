import pool from './pool.js';

const newConnection = (queryString, values) => {
    pool.query(queryString, values)
        .then(res => console.log(res))
        .catch(err => console.log(err))
};

export { newConnection };