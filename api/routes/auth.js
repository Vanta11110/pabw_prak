const express = require("express");
const router = express.Router();
const { register, login, getUser } = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

router.options("/register", (req, res) => {
  res.status(200).end();
});

router.post("/register", register);
router.post("/login", login);
router.get("/user-info", verifyToken, getUser);

module.exports = router;
