const express = require("express");
const router = express.Router();
const {
  postAnswer,
  replyToAnswer,
  verifyAnswer
} = require("../controllers/answer-controller");

const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware"); 

router.post("/:questionId", authMiddleware, postAnswer);
router.post("/:id/replies", authMiddleware, replyToAnswer);
router.patch("/verify/:id", authMiddleware, verifyAnswer); 

module.exports = router;
