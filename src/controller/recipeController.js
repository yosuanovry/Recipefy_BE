const { insertData, getDataByName, selectedDataById, deleteRecipe, updateData, findUser, selectData } = require("../models/recipeModel");
const cloudinary = require("../config/photo")

const RecipesController = {
  inputRecipes: async (req, res, next) => {
    try {
    const imageUrl = await cloudinary.uploader.upload(req.file.path,{folder:'food'})


    if(!imageUrl) {
      return res.status(404).json({status:404,message:`input data failed, failed to upload photo`})
    }


    let data = {};
    data.title = req.body.title;
    data.photo = imageUrl.secure_url;
    data.users_id = req.payload.id;
    data.ingredients = req.body.ingredients;
    data.category_id = req.body.category_id;

    let result = await insertData(data);

    if (!result) {
      return res.status(404).json({ status: 404, message: `input data failed` });
    }
    

   return  res.status(200).json({ status: 200, message: `input data success ` });
  } catch(err) {

    return next(res.status(404).json({status: 404, message: err.message }));
  }
  },

  selectDataById: async (req,res,next)=>{
        try {
            let id = req.params.id

            let result = await selectedDataById(id)
        
            if(result.rows[0]){
                res.status(200).json({status:200,message:`data recipe found`,data:dataCheck.rows})
            } else {
                res.status(400).json({status:400,message:`data recipe not found`})
            }   
        } catch (err) {
          return next(res.status(404).json({status: 404, message: err.message }));
        }
    },

  getRecipesById: async(req,res,next) => {
    try {
      let id = req.params.id
      let {searchBy,search,sortBy,sort} = req.query
      let data = {
        searchBy: searchBy || 'title',
        search: search || '',
        sortBy: sortBy || 'id',
        sort: sort || 'ASC',
        id: req.payload.id
      }
  
      data.page = Number(req.query.page) || 1
      data.limit = Number(req.query.limit) || 10
      data.offset = (data.page - 1) * data.limit
  
      let result = await selectData(id)
      
  
      if(!result){
          return res.status(404).json({status:404,message:`get data failed`})
      }
  
      return res.status(200).json({status:200,message:`get data success `, data:result.rows})
    } catch(err) {
      return next(res.status(404).json({status: 404, message: err.message }));
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

    return res.status(200).json({status:200,message:`get data success `, data:result.rows})
  } catch(err) {
    return next(res.status(404).json({status: 404, message: err.message }));
  }
},

  deleteRecipes: async (req, res, next) => {
    try {
    let id = req.params.id

    let {rows:[users]} =await findUser(req.payload.id)

    if(!users) {
      res.status(404).json({status:404,message:`this recipe is not owned by you`})
    }
  
    let result = await deleteRecipe(id)

    if(!result){
      return res.status(404).json({status:404,message:`delete data failed`})
    }
    
    return res.status(200).json({status:200,message:`delete data success`})
  } catch(err) {
    return next(res.status(404).json({status: 404, message: err.message }));
  }
  },

  updateRecipeData: async(req, res, next) => {
    try {
    const imageUrl = await cloudinary.uploader.upload(req.file.path,{folder:'food'})  

    if(!imageUrl) {
      res.status(404).json({status:404,message:`input data failed, failed to upload photo`})
    }
    let id = req.params.id
    let data = {};
    data.title = req.body.title;
    data.photo = imageUrl.secure_url;
    data.users_id = req.payload.id;
    data.ingredients = req.body.ingredients;
    data.category_id = req.body.category_id;

    let {rows:[users]} = await selectDataById(id)

    if(!users) {
      res.status(404).json({status:404,message:`this recipe is not owned by you`})
    }

    
    let result = await updateData(id, data)

    if(!result){
      return res.status(404).json({status:404,message:`update data failed`})
    }
    
    return res.status(200).json({status:200,message:`update data success`})
  } catch(err) {
    return next(res.status(404).json({status: 404, message: err.message }));
  }
  }
};

module.exports = RecipesController;
