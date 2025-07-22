const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { uploadToCloudinary } = require("../controllers/upload-controller");
const { createQuestion, getQuestionById, searchQuestions, filterQuestions, uploadImage, displayQuestions, } = require("../controllers/question-controller");
const authMiddleware = require("../middleware/auth-middleware");


router.post("/", authMiddleware, createQuestion);
router.get("/", authMiddleware, displayQuestions);
router.get("/all", authMiddleware, displayQuestions);
router.get("/all", authMiddleware, displayQuestions)
router.get("/search", searchQuestions);
router.get("/filter", filterQuestions);
router.get("/:id", getQuestionById);
router.post("/upload", upload.single("file"), uploadToCloudinary);


module.exports = router;
