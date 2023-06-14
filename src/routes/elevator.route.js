const express = require('express');
const router = express.Router();
const elevatorController = require('../controllers/elevator.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');

router.post("/create", verifyToken, verifyIsAdmin, elevatorController.createElevator);
router.put("/update/:id", verifyToken, verifyIsAdmin, elevatorController.updateElevator);
router.delete("/delete/:id", verifyToken, verifyIsAdmin, elevatorController.removeElevator);
router.get("/get-all", verifyToken, verifyIsAdmin, elevatorController.getElevators);

module.exports = router;