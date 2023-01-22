const { response } = require("express");
const { request, get } = require("http");
const axios = require("axios");

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "nutritiondiary_db",
  password: "akira9403",
  port: 5432,
});



// const getUser = (req, res) => {
//   pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
//     if (error) {
//       throw error;
//     }
//     res.status(200).json(results.rows);
//   });
// };

const getUserById = (req, res) => {
  const id = req.params.id;
  console.log(id)
  pool.query("SELECT * FROM users WHERE id = $1",
  [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// const createUser = (request, response) => {
//   const { name, email, password } = request.body;

//   pool.query(
//     "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
//     [name, email, password],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(201).send(`User added with ID: ${results.insertid}`);
//     }
//   );
// };

// const updateUser = (request, response) => {
//   const id = parseInt(request.params.id);
//   const { name, email } = request.body;

//   pool.query(
//     "UPDATE users SET name = $1, email = $2 WHERE id = $3",
//     [name, email, id],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(200).send(`User modified with ID: ${id}`);
//     }
//   );
// };

const deleteUser = (request, response) => {
  console.log('endpoint hit delete')
  const id = parseInt(request.params.id);
  console.log(request.params.id);
  console.log(id);
  

  pool.query("DELETE FROM orders WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

//user order
const createUserOrder = (request, response) => {
  const { user_id, name, cal, protein, fat, carb, date } = request.body;
  console.log(request.body);

  const userOrders =
    pool.query(`INSERT INTO orders (user_id,item_name,cal,protein,fat,carb,date)
  VALUES ('${user_id}','${name}','${cal}','${protein}','${fat}','${carb}','${date}')
  RETURNING *`);

  response.status(201).send(userOrders.rows);
};

//user request order history
const getOrderByDate = async (req, res) => {
  const date = req.body.date;
  const { id } = req.session.user;
  console.log(id);
  console.log(date)
  console.log("history function touchdown!");

  
      pool.query("SELECT * FROM orders WHERE date = $1 AND user_id = $2",
  [date,id], (error, results) => {
    if (error) {
      throw error;
    
    }

  res.status(200).send(results.rows);

  console.log(results.rows);

  }
    );
  };
module.exports = {
  // getUser,
  getUserById,
  // createUser,
  // updateUser,
  deleteUser,
  createUserOrder,
  getOrderByDate,
};
