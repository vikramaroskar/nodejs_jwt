require("dotenv").config();

const express = require("express");
const jwtlib = require("jsonwebtoken");

const app = express();

app.use(express.json());

const posts = [
  {
    username: "Vikram",
    title: "Post 1",
  },
  {
    username: "Vikram",
    title: "Post 2",
  },
  {
    username: "Other user",
    title: "Post 100",
  },
];

app.get("/posts", authenticateToken, (req, res) => {
  console.log("req",req);
  console.log("req",req.body);

  //most important req.user.name
  //user is object set by JWT library
  res.json(posts.filter((post) => post.username === req.user.name));
});

app.post("/login", (req, res) => {
  //Authenticate user

  const username = req.body.username;

  const userobj = { name: username };

  const accessToken = jwtlib.sign(userobj, process.env.SECRET_KEY);

  res.json({ accessToken: accessToken });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  //Bearer TOKEN

  console.log(token);
  if (token == null) return res.sendStatus(401);

  jwtlib.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);

    //JWT library set user object 
    req.user = user;
    next();
  });
}

app.listen(4000);
