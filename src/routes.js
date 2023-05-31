const handler = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/chatbot',
        handler: handler.chatbot,
    },
    {
        method: 'GET',
        path: '/recipes/{id}',
        handler: handler.getRecipeDetail,
    },
    {
        method: 'POST',
        path: '/recipes/{id}/add-to-history',
        handler: handler.addToHistory,
    },
];

module.exports = routes;
