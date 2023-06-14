const bcrypt = require('bcrypt');
const app = require('./app');
const { clearSession } = require('./auth');


const signup = async (request, h) => {
    const { username, password } = request.payload;
    const existingUser = await app.getUserByUsername(username);

    if (existingUser) {
        return h.response({ message: 'Username is already taken' }).code(400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await app.createUser(username, hashedPassword);

    return h.response({ message: 'User created successfully' }).code(201);
};


const login = async (request, h) => {
    const { username, password } = request.payload;
    const user = await app.getUserByUsername(username);

    if (!user) {
        return h.response({ message: 'Invalid credentials' }).code(401);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return h.response({ message: 'Invalid credentials' }).code(401);
    }

    request.cookieAuth.set({ id: user.id });
    return h.response({ message: 'Login successful' }).code(200);
};


const logout = async (request, h) => clearSession(request, h);

const chatbot = async (request, h) => {
    const { messages } = request.payload;
    try {
        const recipes = await app.getRecommendedRecipes(messages);
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
const addMealToTracker = async (request, h) => {
    const {
        meal, mealTitle, mealPhoto, mealCalories,
    } = request.payload;
    const userId = request.auth.credentials.id;

    try {
        await app.addMealToTracker(meal, userId, mealTitle, mealPhoto, mealCalories);
        return h.response({ message: 'Meal added to calorie tracker' }).code(200);
    } catch (error) {
        return h.response({ message: 'Error adding meal to calorie tracker' }).code(500);
    }
};

const getDailyTracker = async (request, h) => {
    const userId = request.auth.credentials.id;

    try {
        const tracker = await app.getDailyTracker(userId);
        return h.response(tracker).code(200);
    } catch (error) {
        return h.response({ message: 'Error retrieving daily tracker' }).code(500);
    }
};

const getTotalCaloriesByDate = async (request, h) => {
    const { date } = request.params;
    const userId = request.auth.credentials.id;

    try {
        const totalCalories = await app.getTotalCaloriesByDate(date, userId);
        return h.response({ total_calories: totalCalories }).code(200);
    } catch (error) {
        return h.response({ message: 'Error retrieving total calories' }).code(500);
    }
};

const searchRecipes = async (request, h) => {
    const { query } = request.query;
    try {
        const recipes = await app.searchRecipes(query);
        return h.response(recipes).code(200);
    } catch (error) {
        return h.response({ message: 'Error searching recipes' }).code(500);
    }
};



module.exports = {
    signup,
    login,
    logout,
    chatbot,
    getRecipeDetail,
    addMealToTracker,
    getDailyTracker,
    getTotalCaloriesByDate,
    searchRecipes,
};
