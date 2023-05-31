const app = require('./app');

const chatbot = async (request, h) => {
    const { ingredients } = request.payload;
    try {
        const recipes = await app.getRecommendedRecipes(ingredients);
        return h.response(recipes).code(200);
    } catch (error) {
        return h.response({ message: 'Error processing request' }).code(500);
    }
};

const getRecipeDetail = async (request, h) => {
    const { id } = request.params;
    try {
        const recipe = await app.getRecipeDetailFromMLModel(id);
        return h.response(recipe).code(200);
    } catch (error) {
        return h.response({ message: 'Error retrieving recipe' }).code(500);
    }
};

const addToHistory = async (request, h) => {
    const { id } = request.params;
    try {
        await app.addToHistoryInDatabase(id);
        return h.response({ message: 'Recipe added to history' }).code(200);
    } catch (error) {
        return h.response({ message: 'Error adding recipe to history' }).code(500);
    }
};

module.exports = {
    chatbot,
    getRecipeDetail,
    addToHistory,
};
