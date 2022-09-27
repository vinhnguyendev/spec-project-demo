const bcrypt = require("bcryptjs");

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
    console.log(req.body);
    console.log(email);

    const userRequest = await pool.query(
      `SELECT * FROM users WHERE email = '${email}'`
    );
    const user = userRequest.rows[0];
    console.log(user);

    if (user) {
      console.log("it's a login");
      const authenticated = bcrypt.compareSync(password, user.password);
      if (authenticated) {
        console.log("it's auth!");
        const userInfo = { name: user.name, email: user.email, id: user.id };
        console.log(req.session);
        req.session.user = userInfo;
        console.log(req.session);

        res.status(200).send(userInfo);
      } else {
        console.log("it's not auth!");
        res.status(403).send("Wrong password, Please try again!");
      }
    } else if (!user) {
      if (!req.body.name) {
        console.log("Checking if user has name property")
        res.status(403).send("Wrong email or password. Please try again!");
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
    if (req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.status(500).send("no user currently login");
    }
  },

  createUserOrder: (request, response) => {
    const {name,cal,protein,fat,carb,date } = request.body;
    console.log(request.body)
    console.log(request.session)
    
    //ask checkuser session
  // axios
  // .get('http://localhost:5055/check')
  // .then(res => {
  //   console.log(res)
  // })
  }  
};
