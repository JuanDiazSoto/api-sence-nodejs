const express = require("express");
const router = express.Router();
const redController = require("../../controller/redirectController");


router.post("redireccionar",redController.actualizaDB);

module.exports = router;
