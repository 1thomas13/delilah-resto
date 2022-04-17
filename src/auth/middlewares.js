const repositories = require("./repositories");
const usersRepositories = require("../users/repositories/usersRepositories");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ Mensaje: "Usuario no autenticado" });
  }
};


exports.logout = (req, res, next) => {
  req.logout();

  next();
};
