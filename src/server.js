const Hapi = require('@hapi/hapi');
const Cookie = require('@hapi/cookie');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port: 8080,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
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
            password: 'randomstringwith32ormorecharactershereokokok',
            isSecure: false,
        },
        redirectTo: '/login',
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
