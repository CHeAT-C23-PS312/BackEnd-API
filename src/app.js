const axios = require('axios');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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

const addToHistoryInDatabase = async (recipeId) => new Promise((resolve, reject) => {
    connection.query('INSERT INTO history (recipe_id) VALUES (?)', [recipeId], (error, results) => {
        if (error) {
            console.error('Error inserting into database:', error);
            reject(error);
        } else {
            resolve();
        }
    });
});

module.exports = {
    getRecommendedRecipes,
    getRecipeDetailFromMLModel,
    addToHistoryInDatabase,
};
