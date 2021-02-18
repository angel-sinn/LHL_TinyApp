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

// -------CHECK EXISTING USER FUNCTION-------

const checkUser = (userDatabase, email) => {
  for (const user in userDatabase) {
    if (userDatabase[user].email === email) {
      return true;
    }
  }
  return false;
};

// -------FIND USER ID BY EMAIL FUNCTION-------

const getUserByEmail = (userDatabase, email) => {
  for (const user in userDatabase) {
    if (userDatabase[user].email === email) {
      return userDatabase[user].id;
    }
  }
};

// -------URLS FOR SPECIFIC USERS FUNCTION-------

const urlsForUser = (urlDatabase, id) => {
  let filtered = {};
  for (const shortURL in urlDatabase) {
    if (urlDatabase[shortURL].userID === id) {
      filtered[shortURL] = urlDatabase[shortURL];
    }
  }
  return filtered;
};

module.exports = {
  generateRandomString,
  checkUser,
  getUserByEmail,
  urlsForUser,
};
