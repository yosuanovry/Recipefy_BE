const express = require('express')
const router = express.Router()
const Users =   require('./userRoute')
const Recipes =   require('./recipeRoute')
const Category = require('./categoryRoute')
const Auth =   require('./authRoute')

router.use('/auth',Auth)
router.use('/users',Users)
router.use('/recipes',Recipes)
router.use('/category',Category)

module.exports = router
