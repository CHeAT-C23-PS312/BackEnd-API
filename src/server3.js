const Hapi = require('@hapi/hapi');

const init = async () => {
    const server = Hapi.server({
        port: 8080,
        host: '0.0.0.0',
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: () => 'Hello, World!',
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init().catch((err) => {
    console.error(err);
    process.exit(1);
});
