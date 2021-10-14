const express = require("express")
const router = express.Router()
const middle = require("../middlewares")
router.use(express.json())
const {allUsers,register,login} = require("../controllers")

router.get("/:id", middle.isLogged,middle.isAdmin, allUsers)

router.post("/", middle.emailValidate, register)

router.post("/login", login)


module.exports = router