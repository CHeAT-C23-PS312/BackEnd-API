console.log('Routes file is accessed');
const handler = require('./handler');


const routes = [
    {
        method: 'POST',
        path: '/signup',
        handler: handler.signup,
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
    },
    {
        method: 'POST',
        path: '/logout',
        handler: handler.logout,
    },

    {
        method: 'GET',
        path: '/recipes/{id}',
        handler: handler.getRecipeDetail,
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
    },
];


module.exports = routes;
