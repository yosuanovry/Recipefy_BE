const express = require("express");
const router = express.Router();
const { inputRecipes, getRecipesByName, getRecipesById, deleteRecipes, updateRecipeData, selectDataById } = require("../controller/recipeController");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/uploadPhoto");
const validateFile = require("../middleware/validatePhoto");

router.post("/", protect, upload.single("photo"), validateFile, inputRecipes);
router.get("/recipes/:id", selectDataById);
router.get("/", getRecipesByName);
router.get("/my-recipes", protect, getRecipesById);
router.delete("/:id", protect, deleteRecipes);
router.put("/:id", protect, upload.single("photo"), validateFile, updateRecipeData);

module.exports = router;
