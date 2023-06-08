console.log('server file is accessed');
const Hapi = require('@hapi/hapi');
const Cookie = require('@hapi/cookie');
const routes = require('./routes');
const auth = require('./auth');

const init = async () => {
    const server = Hapi.server({
        port: 8080,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register(Cookie);

    server.auth.strategy('session', 'cookie', {
        cookie: {
            name: 'session',
            password: 'supersecretpassword',
            isSecure: false,
        },
        redirectTo: '/login',
        validate: auth.validateSession,
    });

    server.auth.default('session');

    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
