const express = require("express");
const router = express.Router();
const { register, login, me } = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware");



router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, me) 

module.exports = router;