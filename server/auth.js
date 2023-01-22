const bcrypt = require("bcryptjs");
const { request, response } = require("express");

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "nutritiondiary_db",
  password: "akira9403",
  port: 5432,
});

module.exports = {
  auth: async (req, res) => {
    const { name, email, password } = req.body;
      const userRequest = await pool.query(
      `SELECT * FROM users WHERE email = '${email}'`
    );
    //check if email match
    const user = userRequest.rows[0];
    if (user) {
      //check if password
      const authenticated = bcrypt.compareSync(password, user.password);
      if (authenticated) {
        console.log("it's auth!");
        const userInfo = { name: user.name, email: user.email, id: user.id };
        
        //session user
        req.session.user = userInfo;
      console.log(userInfo)
      respond = {"true": true,"userId":userInfo.id}
        res.status(200).send(respond);
      } else {
        console.log("it's not auth!");
        res.status(200).send(false);
      }
    } else if (!user) {
      if (!req.body.name) {
        console.log("Checking if user has name property")
        res.status(403).send(false);
      } else {
        console.log("new user been register");
        const salt = bcrypt.genSaltSync(10);
        const passHash = bcrypt.hashSync(password, salt);

        const newUser =
          await pool.query(`INSERT INTO users (name,email,password) 
          VALUES ('${name}','${email}','${passHash}')
          RETURNING name,email,id`);

        res.status(200).send(newUser.rows);
      }
    }
  },


  checkUser: (req, res) => {
    console.log(req.session.user)
    if (req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.status(200).send("no user currently login");
    }
  },


};
