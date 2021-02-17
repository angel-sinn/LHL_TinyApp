const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const urlDatabase = {
  b2xVn2: "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com",
};

const generateRandomString = function () {
  let generatedURL = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let characterLength = characters.length;
  for (let i = 0; i < 6; i++) {
    generatedURL += characters.charAt(
      Math.floor(Math.random() * characterLength)
    );
  }
  return generatedURL;
};

const templateVars = {
  username: req.cookies["username"],
};

// res.render("urls_index", templateVars);

// -------ROUTES-------

app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:shortURL", (req, res) => {
  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL],
  };
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b> World</b></body></html>\n");
});

// -------CREATE-------

app.post("/urls", (req, res) => {
  console.log("req.body:", req.body); // Log the POST request body to the console
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = req.body.longURL;
  res.redirect(`/urls/${shortURL}`);
});

app.post("/login", (req, res) => {
  console.log("username", req.body.username);
  res.cookie("username", req.body.username);
  res.redirect("/urls");
});

// -------UPDATE-------

app.post("/urls/:shortURL", (req, res) => {
  console.log("req.body:", req.body);
  urlDatabase[req.params.shortURL] = req.body.newURL;
  res.redirect("/urls");
});

// -------DELETE-------

app.post("/urls/:shortURL/delete", (req, res) => {
  // console.log("i want to delete:", req.params.shortURL);
  delete urlDatabase[req.params.shortURL];
  res.redirect("/urls");
});

// -------LISTEN-------

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
