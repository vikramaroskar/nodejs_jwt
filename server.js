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
  console.log("req", req);
  console.log("req", req.body);

  //most important req.user.name
  //user is object set by JWT library
  res.json(posts.filter((post) => post.username === req.user.name));
});

app.post("/login", (req, res) => {
  //Authenticate user

  const username = req.body.username;

  const userobj = { name: username };

  const accessToken = jwtlib.sign(userobj, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });

  const refreshToken = jwtlib.sign(userobj, process.env.REFRESH_KEY);

  refreshTokenList.push(refreshToken);

  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

let refreshTokenList = [];

app.post("/token", (req, res) => {
  const refreshToken = req.body.refreshtoken;
  //check to see if refreshtoken is valid, usually in database

  if (refreshToken == null) res.sendStatus(401);
  if (!refreshTokenList.includes(refreshToken)) return res.sendStatus(403);

  jwtlib.verify(refreshToken, process.env.REFRESH_KEY, (err, user) => {
      if (err) return res.sendStatus(403);

      //need to extract into common method 
      const accessToken = jwtlib.sign(user, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });

      res.json(accessToken);
  });


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

app.listen(3000);
