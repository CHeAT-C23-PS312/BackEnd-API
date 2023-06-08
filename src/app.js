console.log('app file is accessed');
// require('dotenv').config();
const axios = require('axios');
const mysql = require('mysql');
const { createUser, getUserByUsername } = require('./auth');

// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });

const DB_HOST = '34.101.187.193';
const DB_USER = 'ucheat';
const DB_PASSWORD = 'ucheat';
const DB_NAME = 'db_cheat';

const connection = mysql.createConnection({

    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
});

const ML_MODEL_URL = process.env.ML_MODEL_URL || 'http://your-ml-model-url';

const getRecommendedRecipes = async (ingredients) => {
    try {
        const response = await axios.post(`${ML_MODEL_URL}/chatbot`, { ingredients });
        return response.data;
    } catch (error) {
        console.error('Error calling ML model:', error);
        throw error;
    }
};

const getRecipeDetailFromMLModel = async (recipeId) => {
    try {
        const response = await axios.get(`${ML_MODEL_URL}/recipes/${recipeId}`);
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

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        process.exit(1);
    }
    console.log('Connected to database');
});

module.exports = {
    getRecommendedRecipes,
    getRecipeDetailFromMLModel,
    addMealToTracker,
    getDailyTracker,
    getTotalCaloriesByDate,
    createUser,
    getUserByUsername,
    searchRecipes,
};
