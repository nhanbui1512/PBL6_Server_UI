const rootController = require("../app/controllers/rootController");
const express = require("express");
const router = express.Router();

router.get("/", rootController.index);
module.exports = router;
