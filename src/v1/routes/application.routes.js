const express = require("express");
const router = express.Router();
const appController = require("../../controller/applicationController");

router.get("/save",appController.createNewApp);
router.get("/applications", appController.getApplications);
router.get("/update", appController.updateApplication);
router.get("/:id", appController.getApplication);

module.exports = router;
