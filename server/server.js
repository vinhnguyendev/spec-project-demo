const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const db = require('./user')
require('dotenv').config()

const {auth, checkUser} = require('./auth');
const session = require("express-session");
const {SERVER_PORT} = process.env



const app = express();

app.use(express.json());
app.use(cors({credentials: true,origin: "http://localhost:3000"}));

app.use(session({
  resave:false,
  saveUninitialized: true,
  secret: "asds?3;axytrfd33'?!sd?12e;asx",
  cookie:{
    // maxAge:1000*60*60*72,
    secure: !true
  }
}))

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


//session boiler
const test = () => async (req, res) => {
  const { name, email, password } = req.body;
  res.status(200).send(true);
}

//USER

// app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
// app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)

app.post('/login', auth)
// app.get('/check', checkUser)
app.post('/usersorder', db.createUserOrder)
app.post('/order-history', db.getOrderByDate)
app.post('/test', test())









//SERVER
const PORT = 5055
app.listen(PORT, () => console.log(`Server is live on port ${PORT}`));
