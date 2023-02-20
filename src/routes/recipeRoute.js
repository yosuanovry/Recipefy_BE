const express = require('express')
const router = express.Router()
const {inputRecipes, getRecipesByName, getRecipesById, deleteRecipes, updateRecipeData} = require('../controller/recipeController');

router.post('/',inputRecipes);
router.get('/', getRecipesByName);
router.get('/:id', getRecipesById);
router.delete('/:id', deleteRecipes);
router.put("/:id", updateRecipeData);

module.exports = router
