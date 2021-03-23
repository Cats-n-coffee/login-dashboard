import pool from './pool.js';

const newConnection = (queryString) => {
    pool.query(queryString)
        .then(res => console.log(res))
        .catch(err => console.log(err))
};

export { newConnection };