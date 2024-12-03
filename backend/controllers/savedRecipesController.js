const savedRecipesModel = require('../models/savedRecipesModel');

// Menyimpan resep yang disukai
const saveRecipe = (req, res) => {
    const userId = req.user.id;  // Pastikan token sudah terverifikasi dan `user.id` ada di req.user
    const { recipeId } = req.body;

    savedRecipesModel.saveRecipe(userId, recipeId)
        .then(() => {
            res.json({ success: true, message: 'Recipe saved successfully!' });
        })
        .catch((err) => {
            console.error('Error saving recipe:', err);
            res.status(500).json({ success: false, message: 'Error saving recipe.' });
        });
};

// Mengecek apakah resep sudah disimpan
const isRecipeSaved = (req, res) => {
    const userId = req.user.id;  // Pastikan token sudah terverifikasi
    const { recipeId } = req.body;

    savedRecipesModel.isRecipeSaved(userId, recipeId)
        .then((isSaved) => {
            res.json({ success: true, isSaved });
        })
        .catch((err) => {
            console.error('Error checking saved recipe:', err);
            res.status(500).json({ success: false, message: 'Error checking saved recipe.' });
        });
};

// Mengambil resep yang disimpan oleh pengguna
const getSavedRecipes = async (req, res) => {
    try {
        const userId = req.user.id; // Dapatkan user_id dari token autentikasi
        const savedRecipes = await savedRecipesModel.getSavedRecipesByUserId(userId);

        res.status(200).json({
            success: true,
            recipes: savedRecipes,
        });
    } catch (error) {
        console.error('Error in getSavedRecipes controller:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch saved recipes',
        });
    }
};

module.exports = {
    saveRecipe,
    isRecipeSaved,
    getSavedRecipes
};
