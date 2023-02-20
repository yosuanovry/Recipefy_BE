const Pool = require("../config/db");

const insertData = (data) => {
  let { ingredients, title, photo, users_id, category_id } = data;
  let time = new Date().toISOString();
  return Pool.query(`INSERT INTO recipes(title,ingredients,photo,users_id,created_at, category_id) VALUES('${title}','${ingredients}','${photo}',${users_id},'${time}', '${category_id}')`);
};

const getDataByName = (data) => {
  let {searchBy,search,sortBy,sort, limit, offset} = data
  return Pool.query(
    `SELECT recipes.id,recipes.title,recipes.ingredients,recipes.created_at as posttime, users.name as creator, category.name as category FROM recipes JOIN category ON recipes.category_id=category.id JOIN users ON users_id=users.id WHERE recipes.${searchBy} ILIKE '%${search}%' AND recipes.deleted_at IS NULL ORDER BY recipes.${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
}

const selectData = () => {
  return Pool.query(
  `SELECT recipes.title,recipes.ingredients,recipes.created_at as posttime, users.name as creator, category.name as category FROM recipes JOIN category ON recipes.category_id=category.id JOIN users ON users_id=users.id`
  )
} 

const selectDataById = (data) => {
  return Pool.query(`SELECT * FROM recipes WHERE id='${data}'`);
};

const deleteRecipe = (id) => {
  let time = new Date().toISOString();
  return Pool.query(
    `UPDATE recipes SET deleted_at='${time}' WHERE id='${id}'`
    );
};


const updateData = (id, data) => {
  let { ingredients, title, photo, users_id, category_id } = data;
  return Pool.query(`UPDATE recipes SET ingredients='${ingredients}', title='${title}', photo='${photo}', users_id=${users_id}, category_id=${category_id} WHERE id='${id}'`);
}





module.exports = { insertData, selectData, deleteRecipe, selectDataById, updateData, getDataByName };
