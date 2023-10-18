import mysqlConnection from 'mysql2/promise';

const properties = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rest-api'
};

const pool = mysqlConnection.createPool(properties);

export { pool }; 
