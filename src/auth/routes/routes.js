const express = require("express");
const passport = require("passport");
const session = require("express-session");
const config = require("../../config");

const router = express.Router();

router.use(
  session({
    secret: config.config.expressSession.secret,
    resave: true,
    saveUninitialized: true,
  })
);
router.use(passport.initialize());
router.use(passport.session());

const isLoggedIn = (req, res, next) => {
  
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ Mensaje: "Usuario no autenticado" });
  }
};

router.get("/failed", (req, res) => {
  console.log("Falla la loguearse");
  return res.status(401).json({ Mensaje: "Falla al loguearse" });
});

require("../controllers/google");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  (req, res) => console.log("Usuario autenticado")
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
    successRedirect: "/home",
  })
);

require("../controllers/facebook");

router.get("/auth/facebook", passport.authenticate("facebook"), (req, res) =>
  console.log("Usuario autenticado")
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/failed",
    successRedirect: "/home",
  })
);

require("../controllers/linkedin");

router.get(
  "/auth/linkedin",

  passport.authenticate("linkedin", {
    scope: ["r_liteprofile", "r_emailaddress"],
    credentials: "include",
  })
);

router.get(
  "/auth/linkedin/callback",
  passport.authenticate("linkedin", {
    failureRedirect: "/failed",
    successRedirect: "/home",
  })
);

require("../controllers/github");

router.get("/auth/github", passport.authenticate("github"), (req, res) =>
  console.log("Usuario autenticado")
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/failed",
    successRedirect: "/home",
  })
);

function logout(req, res, next) {
  req.logout();

  next();
}

router.get("/home", isLoggedIn, (req, res) => {
  return res.send({ Mensaje: `Bienvenido ${req.user.displayName}` });
});

router.get("/logout", isLoggedIn, logout, (req, res) => {
  res.status(200).redirect("/home");
});

module.exports = router;
