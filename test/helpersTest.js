const { assert } = require("chai");
const {
  generateRandomString,
  checkUser,
  getUserByEmail,
  urlsForUser,
} = require("../helpers");

const testUsers = {
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

const urlDatabase = {
  b2xVn2: { longURL: "http://www.lighthouselabs.ca", userID: "aJ48lW" },
  "9sm5xK": { longURL: "http://www.google.com", userID: "aJ48lW" },
};

// -------generateRandomString test-------

describe("generateRandomString", () => {
  it("should return a random string (userID) with 6 characters", () => {
    const userID = generateRandomString().length;
    const expectedOutput = 6;
    assert.equal(userID, expectedOutput);
  });
});

// -------checkUser test-------

describe("checkUser", () => {
  it("should return true if email is already in database", () => {
    const user = checkUser(testUsers, "user@example.com");
    const expectedOutput = true;
    assert.equal(user, expectedOutput);
  });
});

describe("checkUser", () => {
  it("should return false if email is not in database", () => {
    const user = checkUser(testUsers, "user123@example.com");
    const expectedOutput = false;
    assert.equal(user, expectedOutput);
  });
});

// -------getUserByEmail test-------

describe("getUserByEmail", () => {
  it("should return a user with valid email", () => {
    const user = getUserByEmail(testUsers, "user@example.com");
    const expectedOutput = "userRandomID";
    assert.equal(user, expectedOutput);
  });
});

describe("getUserByEmail", () => {
  it("should return undefined with a non-existent email", () => {
    const user = getUserByEmail(testUsers, "user123@example.com");
    const expectedOutput = undefined;
    assert.equal(user, expectedOutput);
  });
});

// -------urlsForUser-------

describe("urlsForUser", () => {
  it("should return list of urls that belong to specific user", () => {
    const urls = urlsForUser(urlDatabase, "aJ48lW");
    const expectedOutput = {
      b2xVn2: { longURL: "http://www.lighthouselabs.ca", userID: "aJ48lW" },
      "9sm5xK": { longURL: "http://www.google.com", userID: "aJ48lW" },
    };
    assert.deepEqual(urls, expectedOutput);
  });
});

describe("urlsForUser", () => {
  it("should return empty object if specific user does not have existing urls", () => {
    const urls = urlsForUser(urlDatabase, "123456");
    const expectedOutput = {};
    assert.deepEqual(urls, expectedOutput);
  });
});
