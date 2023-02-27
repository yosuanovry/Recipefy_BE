const Pool = require('./../config/db')

const selectData = (data) => {
    let {searchBy,search} = data
    return Pool.query(`SELECT users.id,users.email,users.password FROM users WHERE users.${searchBy} ILIKE '%${search}%'`);
  };

const insertData = data => {
  console.log(data)
  return Pool.query(
    `INSERT INTO users(name) VALUES('${data}')`
  );
}
const selectUserById = (id) => {
  return new Promise((resolve,reject)=>
  Pool.query(`SELECT * FROM users WHERE id='${id}'`,
  (err,result)=>{
    if(!err){
      resolve(result)
    } else {
      reject(err)
    }
  }))
}

const updateData = (id,data) => {
  console.log(data)
  return Pool.query(
    `UPDATE users SET name='${data}' WHERE id=${id}`
  );
}

const deleteUser = (id) => {
  console.log(id)
  return Pool.query(
    `DELETE FROM users WHERE id=${id}`
  );
}

const findUser = (email) => {
  return new Promise((resolve,reject)=>
  Pool.query(`SELECT * FROM users WHERE email='${email}'`,
  (err,result)=>{
    if(!err){
      resolve(result)
    } else {
      reject(err)
    }
  }))
}

const createUser = (data) => {
  const {email,fullname,password,id,otp, role} = data
  let time = new Date().toISOString();
  return new Promise((resolve,reject)=>
  Pool.query(`INSERT INTO users(id,email,fullname,password,otp, role, created_at) VALUES('${id}','${email}','${fullname}','${password}','${otp}','${role}','${time}')`,(err,result)=>{
    if(!err){
      resolve(result)
    } else {
      reject(err)
    }
  }))
}

const verifyUser = (id) => {
  return Pool.query(
    `UPDATE users SET verif=1 WHERE id='${id}'`
  );
}

module.exports = {selectData,insertData,selectUserById,updateData,deleteUser,findUser,createUser,verifyUser}