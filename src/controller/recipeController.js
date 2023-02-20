const { insertData, getDataByName, selectData, selectDataById, deleteRecipe, updateData } = require("../models/recipeModel");

const RecipesController = {
  inputRecipes: async (req, res, next) => {
    try {
    let data = {};
    data.title = req.body.title;
    data.photo = req.body.photo;
    data.users_id = req.body.users_id;
    data.ingredients = req.body.ingredients;
    data.category_id = req.body.category_id;

    let result = await insertData(data);

    if (!result) {
      res.status(404).json({ status: 404, message: `input data failed` });
    }
    
    let showUser = await selectData()

    res.status(200).json({ status: 200, message: `input data success `, data: showUser.rows });
  } catch(err) {

    next(res.status(404).json({status: 404, message: err.message }));
  }
  },

  getRecipesById: async(req,res,next) => {
    try {
    let id = req.params.id
    let result = await selectDataById(id)

    if(result.rows[0]){
      res.status(200).json({status:200,message:`get data success `, data:result.rows})
    }
    
    res.status(404).json({status:404,message:`get data failed`})
  } catch(err) {
    next(res.status(404).json({status: 404, message: err.message }));
  }
  },
  
  getRecipesByName: async (req,res,next) => {
    try {
    let {searchBy,search,sortBy,sort} = req.query
    let data = {
      searchBy: searchBy || 'title',
      search: search || '',
      sortBy: sortBy || 'id',
      sort: sort || 'ASC',
      
    }

    data.page = Number(req.query.page) || 1
    data.limit = Number(req.query.limit) || 10
    data.offset = (data.page - 1) * data.limit

    let result = await getDataByName(data)
    

    if(!result){
        res.status(404).json({status:404,message:`get data failed`})
    }

    res.status(200).json({status:200,message:`get data success `, data:result.rows})
  } catch(err) {
    next(res.status(404).json({status: 404, message: err.message }));
  }
},

  deleteRecipes: async (req, res, next) => {
    try {
    let id = req.params.id
    let result = await deleteRecipe(id)

    if(!result){
      res.status(404).json({status:404,message:`delete data failed`})
    }
    
    res.status(200).json({status:200,message:`delete data success`})
  } catch(err) {
    next(res.status(404).json({status: 404, message: err.message }));
  }
  },

  updateRecipeData: async(req, res, next) => {
    try {
    let id = req.params.id;
    let data = {};
    data.title = req.body.title;
    data.photo = req.body.photo;
    data.users_id = req.body.users_id;
    data.ingredients = req.body.ingredients;
    data.category_id = req.body.category_id;


    let result = await updateData(id, data)

    if(!result){
      res.status(404).json({status:404,message:`update data failed`})
    }
    
    let showUser = await selectDataById(id)

    res.status(200).json({status:200,message:`update data success`, data:showUser.rows})
  } catch(err) {
    next(res.status(404).json({status: 404, message: err.message }));
  }
  }
};

module.exports = RecipesController;
