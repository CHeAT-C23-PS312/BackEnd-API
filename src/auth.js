console.log('auth file is accessed');
const users = [
    {
        id: 1,
        username: 'user1',
        password: 'password1',
    },
    {
        id: 2,
        username: 'user2',
        password: 'password2',
    },
];

const getUserByUsername = (username) => users.find((user) => user.username === username);

const createUser = (username, password) => {
    const newUser = {
        id: users.length + 1,
        username,
        password,
    };
    users.push(newUser);
    return newUser;
};

const validateSession = (request, session) => {
    const user = users.find((u) => u.id === session.id);
    if (!user) {
        return { valid: false };
    }
    return { valid: true, credentials: user };
};

const clearSession = (request, h) => {
    request.cookieAuth.clear();
    return h.response({ message: 'Logout successful' }).code(200);
};

module.exports = {
    getUserByUsername,
    createUser,
    validateSession,
    clearSession,
};
