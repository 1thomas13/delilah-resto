const express = require("express");
const passport = require("passport");
const session = require("express-session");
const config = require("../../config");

const router = express.Router();

const middlewares = require("../middlewares")

const {login} = require("../../users/controllers");

router.use(
  session({
    secret: config.config.expressSession.secret,
    resave: true,
    saveUninitialized: true,
  })
);
router.use(passport.initialize());
router.use(passport.session());



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

router.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }));

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



router.get("/home",  middlewares.isLoggedIn,login, (req, res) => {
  
  const query = req.token
  return res.status(200).redirect(`http://localhost:3001?${query}`);
});

router.get("/logout", middlewares.isLoggedIn, middlewares.logout, (req, res) => {
  console.log("te deslogeaste correctamente")
  res.status(200).redirect("http://localhost:3001/login");
});

module.exports = router;
