const { selectData, insertData, selectDataById, updateData, deleteUser } = require("../models/categoryModel");


const CategoryController = {
  getDetail: async (req, res, next) => {
    try {
    let id = req.params.id;
    let result = await selectDataById(id);

    if(result.rows[0]) {
      res.status(200).json({ status: 200, message: `data found`, data: result.rows})
    }
    res.status(400).json({ status: 400, message: `data user not found` });
  }
   catch(err) {
    next(res.status(404).json({status: 404, message: err.message }));
   }
  },


  getData: async (req, res, next) => {
    try {
    let {searchBy,search} = req.query
    let data = {
      searchBy: searchBy || 'name',
      search: search || '',
    }

    let showUser = await selectData(data);
    if (!showUser) {
      res.status(400).json({ status: 400, message: `data user not found` });
    }

    res.status(200).json({ status: 200, message: `data found`, data: showUser.rows });
  } catch(err) {
    next(res.status(404).json({status: 404, message: err.message }));
   }
  },


  postData: async (req, res, next) => {
    try {
    let body = req.query;
    let input = await insertData(body.name);

    if (!input) {
      res.status(401).json({ status: 400, message: `data input failed` });
    }

    let checkData = await selectDataById("name", body.name);

    if (!checkData) {
      res.status(404).json({ status: 404, message: `data input failed` });
    }

    res.status(200).json({ status: 200, message: `data input success`, data: checkData.rows });

  } catch(err) {
    next(res.status(404).json({status: 404, message: err.message }));
  }
  },


  putData: async (req, res, next) => {
    try {
    let id = req.params.id;
    let name = req.body.name;

    let result = await updateData(id, name);

    if (!result) {
      res.status(404).json({ status: 404, message: `data input not found` });
    }

    let checkData = await selectDataById("id", id);

    res.status(200).json({ status: 200, message: `update data success`, data: checkData.rows });
  } catch(err) {
    next(res.status(404).json({status: 404, message: err.message }));
  }
  },


  deleteData: async (req, res, next) => {
    try {
    let id = req.params.id;
    let result = await deleteUser(id);

    console.log(result);

    if (!result) {
      res.status(404).json({ status: 404, message: `delete data failed` });
    }

    res.status(200).json({ status: 200, message: `delete data success`, data: `data id ${id} deleted` });
  } catch(err) {
    next(res.status(404).json({status: 404, message: err.message }));
  }
} 
};

module.exports = CategoryController;
