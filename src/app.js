const axios = require('axios');
const connection = require('./database');
const { createUser, getUserByUsername } = require('./auth');


const ML_MODEL_URL = process.env.ML_MODEL_URL || 'https://model-ml-390012.et.r.appspot.com/';

const getRecommendedRecipes = async (messages) => {
    try {
        const response = await axios.post(`${ML_MODEL_URL}/predict`, { messages });
        return response.data;
    } catch (error) {
        console.error('Error processing request:', error);
        throw error;
    }
};

const getRecipeDetailFromMLModel = async (recipeId) => {
    try {
        const response = await axios.post(`${ML_MODEL_URL}/recipe/${recipeId}`);
        return response.data;
    } catch (error) {
        console.error('Error calling ML model:', error);
        throw error;
    }
};

const addMealToTracker = async (meal, userId, mealTitle, mealPhoto, mealCalories) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const totalCalories = meal.reduce((total, item) => total + item.calories, 0);

    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO calorie_tracker (date, total_calories, user_id, meal_title, meal_photo, meal_calories) VALUES (?, ?, ?, ?, ?, ?)',
            [currentDate, totalCalories, userId, mealTitle, mealPhoto, mealCalories],
            (error) => {
                if (error) {
                    console.error('Error inserting into database:', error);
                    reject(error);
                } else {
                    resolve();
                }
            },
        );
    });
};

const getDailyTracker = async (userId) => new Promise((resolve, reject) => {
    connection.query(
        'SELECT * FROM calorie_tracker WHERE user_id = ?',
        [userId],
        (error, results) => {
            if (error) {
                console.error('Error retrieving daily tracker:', error);
                reject(error);
            } else {
                resolve(results);
            }
        },
    );
});

const getTotalCaloriesByDate = async (date, userId) => new Promise((resolve, reject) => {
    connection.query(
        'SELECT total_calories FROM calorie_tracker WHERE date = ? AND user_id = ?',
        [date, userId],
        (error, results) => {
            if (error) {
                console.error('Error retrieving total calories:', error);
                reject(error);
            } else if (results.length > 0) {
                resolve(results[0].total_calories);
            } else {
                resolve(0);
            }
        },
    );
});
const searchRecipes = async (query) => {
    try {
        const response = await axios.get(`${ML_MODEL_URL}/recipes/search?query=${query}`);
        return response.data;
    } catch (error) {
        console.error('Error calling ML model:', error);
        throw error;
    }
};


module.exports = {
    getRecommendedRecipes,
    getRecipeDetailFromMLModel,
    addMealToTracker,
    getDailyTracker,
    getTotalCaloriesByDate,
    createUser,
    getUserByUsername,
    searchRecipes,
    connection,
};
