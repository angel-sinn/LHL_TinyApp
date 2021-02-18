// -------FIND USER ID BY EMAIL FUNCTION-------

const getUserByEmail = (userDatabase, email) => {
  for (const user in userDatabase) {
    if (userDatabase[user].email === email) {
      return userDatabase[user].id;
    }
  }
};

module.exports = { getUserByEmail };
