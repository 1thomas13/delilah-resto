const express = require("express")
const router = express.Router()
const middle = require("./middlewares")

router.use(express.json())