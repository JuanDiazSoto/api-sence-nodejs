const express = require("express");
const router = express.Router();
const utilController = require("../../controller/utilController");

router.get("/ip",utilController.getIp);

module.exports = router;
