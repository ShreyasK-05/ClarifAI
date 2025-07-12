const express = require("express");
const router = express.Router();
const {voteQuestion}= require("../controllers/vote-controller");
const {voteAnswer} = require("../controllers/vote-controller");
const authMiddleware = require("../middleware/auth-middleware");

router.patch("/question/:id", authMiddleware, voteQuestion);
router.patch("/answer/:id", authMiddleware, voteAnswer);

module.exports = router;
