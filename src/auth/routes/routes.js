const express = require("express");
const passport = require("passport");
const session = require("express-session");
const config = require("../../config");

const router = express.Router();

const middlewares = require("../middlewares")

const {login} = require("../../users/controllers");

// router.use(
//   session({
//     secret: config.config.expressSession.secret,
//     resave: true,
//     saveUninitialized: true,
//   })
// );
// router.use(passport.initialize());
// router.use(passport.session());



router.get("/failed", (req, res) => {
  console.log("Falla la loguearse");
  return res.status(401).json({ Mensaje: "Falla al loguearse" });
});

require("../controllers/google");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  (req, res) => console.log("Usuario autenticado")
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
    successRedirect: "/auth/home",
  })
);

require("../controllers/facebook");

router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/failed",
    successRedirect: "/auth/home",
  })
);

require("../controllers/linkedin");

router.get(
  "/linkedin",

  passport.authenticate("linkedin", {
    scope: ["r_liteprofile", "r_emailaddress"],
    credentials: "include",
  })
);

router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", {
    failureRedirect: "/failed",
    successRedirect: "/auth/home",
  })
);

require("../controllers/github");

router.get("/github", passport.authenticate("github"), (req, res) =>
  console.log("Usuario autenticado")
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/failed",
    successRedirect: "/auth/home",
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
