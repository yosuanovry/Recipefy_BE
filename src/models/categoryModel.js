const Pool = require("../config/db");

const selectData = (data) => {
  let {searchBy,search} = data
  return Pool.query(`SELECT category.id,category.name FROM category WHERE category.${searchBy} ILIKE '%${search}%'`);
};

const insertData = (data) => {
  console.log(data);
  return Pool.query(`INSERT INTO category(name) VALUES('${data}')`);
};
const selectDataById = (by,data) => {
  console.log(data);
  return Pool.query(`SELECT * FROM category WHERE ${by}='${data}'`);
};


const updateData = (id, data) => {
  console.log(data);
  return Pool.query(`UPDATE category SET name='${data}' WHERE id=${id}`);
};

const deleteUser = (id) => {
  console.log(id);
  return Pool.query(`DELETE FROM category WHERE id=${id}`);
};

module.exports = { selectData, insertData, selectDataById, updateData, deleteUser };
