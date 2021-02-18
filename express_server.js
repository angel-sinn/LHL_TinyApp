const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("view engine", "ejs");

// -------URL DATABASE-------

const urlDatabase = {
  b2xVn2: "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com",
};

// -------USER DATABASE-------

const users = {
  userRandomID: {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur",
  },
  user2RandomID: {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk",
  },
};

// -------GENERATE RANDOM STRING FUNCTION-------

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

// -------CHECK EXISTING USER-------

const checkUser = (userDatabase, email) => {
  for (const user in userDatabase) {
    if (userDatabase[user].email === email) {
      return true;
    } else {
      return false;
    }
  }
};

// -------FIND USER ID BY EMAIL-------

const userIDByEmail = (userDatabase, email) => {
  for (const user in userDatabase) {
    if (userDatabase[user].email === email) {
      return userDatabase[user].id;
    }
  }
};

// -------ROUTES-------

app.get("/login", (req, res) => {
  const templateVars = {
    user: users[req.cookies["user_id"]],
  };
  res.render("login", templateVars);
});

app.get("/register", (req, res) => {
  const templateVars = {
    user: users[req.cookies["user_id"]],
  };
  res.render("register", templateVars);
});

app.get("/urls", (req, res) => {
  const templateVars = {
    urls: urlDatabase,
    user: users[req.cookies["user_id"]],
  };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  const templateVars = {
    user: users[req.cookies["user_id"]],
  };
  res.render("urls_new", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  const templateVars = {
    user: users[req.cookies["user_id"]],
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

// -------CREATE SHORT URL-------

app.post("/urls", (req, res) => {
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = req.body.longURL;
  res.redirect(`/urls/${shortURL}`);
});

// -------UPDATE URL-------

app.post("/urls/:shortURL", (req, res) => {
  urlDatabase[req.params.shortURL] = req.body.newURL;
  res.redirect("/urls");
});

// -------DELETE URL-------

app.post("/urls/:shortURL/delete", (req, res) => {
  delete urlDatabase[req.params.shortURL];
  res.redirect("/urls");
});

// -------REGISTRATION HANDLER-------

app.post("/register", (req, res) => {
  if (req.body.email === "" || req.body.password === "") {
    res
      .status(400)
      .send(
        `One of the fields were empty. Please enter a valid email address and password.`
      );
  } else if (checkUser(users, req.body.email)) {
    res
      .status(400)
      .send(
        `An account for this email address already exists. Please use a different email address.`
      );
  } else {
    let userID = generateRandomString();

    users[userID] = {
      id: userID,
      email: req.body.email,
      password: req.body.password,
    };

    res.cookie("user_id", userID);
    res.redirect("/urls");
  }
});

// -------USER LOGIN HANDLER-------

app.post("/login", (req, res) => {
  let loginEmail = req.body.email;
  let loginPassword = req.body.password;
  let userID = userIDByEmail(users, loginEmail);

  if (!checkUser(users, loginEmail)) {
    res.status(403).send(`No account associated with this email address.`);
  } else if (users[userID].password !== loginPassword) {
    res.status(403).send(`Incorrect password. Please try again.`);
  } else {
    res.cookie("user_id", userID);
    res.redirect("/urls");
  }
});

// -------USER LOGOUT-------

app.post("/logout", (req, res) => {
  res.clearCookie("user_id");
  res.redirect("/urls");
});

// -------LISTEN TO PORT-------

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
