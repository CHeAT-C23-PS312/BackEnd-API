const connection = require('./database');


const getUserByUsername = (username) => new Promise((resolve, reject) => {
    connection.query(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        },
    );
});


const createUser = (username, password) => {
    const newUser = {
        username,
        password,
    };

    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [newUser.username, newUser.password],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    newUser.id = result.insertId;
                    resolve(newUser);
                }
            },
        );
    });
};



const clearSession = (request, h) => {
    request.cookieAuth.clear();
    return h.response({ message: 'Logout successful' }).code(200);
};

module.exports = {
    getUserByUsername,
    createUser,
    clearSession,
};
