const handler = require('./handler');


const routes = [
    {
        method: 'POST',
        path: '/signup',
        handler: handler.signup,
        options: {
            auth: false,
        },
    },
    {
        method: 'POST',
        path: '/login',
        handler: handler.login,
        options: {
            auth: false,
        },
    },
    {
        method: 'POST',
        path: '/chatbot',
        handler: handler.chatbot,
        options: {
            auth: false,
        },
    },
    {
        method: 'POST',
        path: '/logout',
        handler: handler.logout,
        options: {
            auth: false,
        },
    },

    {
        method: 'GET',
        path: '/recipes/{id}',
        handler: handler.getRecipeDetail,
        options: {
            auth: false,
        },
    },
    {
        method: 'POST',
        path: '/calorie-tracker/add-meal',
        handler: handler.addMealToTracker,
    },
    {
        method: 'GET',
        path: '/calorie-tracker/daily-tracker',
        handler: handler.getDailyTracker,
    },
    {
        method: 'GET',
        path: '/calorie-tracker/daily-tracker/{date}',
        handler: handler.getTotalCaloriesByDate,
    },
    {
        method: 'GET',
        path: '/recipes/search',
        handler: handler.searchRecipes,
        options: {
            auth: false,
        },
    },
];


module.exports = routes;
