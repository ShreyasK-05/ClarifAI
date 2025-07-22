const express = require("express");
const router = express.Router();
const {
  postAnswer,
  replyToAnswer,
  verifyAnswer,
  displayAnswers
} = require("../controllers/answer-controller");

const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware"); 

router.post("/:questionId", authMiddleware, postAnswer);
router.get("/", authMiddleware, displayAnswers);
router.post("/:id/replies", authMiddleware, replyToAnswer);
router.patch("/verify/:id", authMiddleware, verifyAnswer); 

module.exports = router;
