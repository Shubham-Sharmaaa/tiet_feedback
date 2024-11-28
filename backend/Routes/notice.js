
const express = require("express");
const router = express.Router();


const { postNotice, getNotices } = require("../controllers/noticeController");

router.post("/notices", postNotice);
router.get("/notices", getNotices);

module.exports = router;
