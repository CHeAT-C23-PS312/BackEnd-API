const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '34.101.187.193',
    user: 'ucheat',
    password: 'ucheat',
    database: 'db_cheat',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        process.exit(1);
    }
    console.log('Connected to database');
});

module.exports = connection;
