const express = require('express');
const router = express.Router();
const wasteTypeController = require('../controllers/waste_type.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');

router.post("/create", verifyToken, verifyIsAdmin, wasteTypeController.createWasteType);
router.get("/get-all", verifyToken, verifyIsAdmin, wasteTypeController.getWasteTypes);
router.get("/get-weights/:id", verifyToken, verifyIsAdmin, wasteTypeController.getWasteTypeWeight);

module.exports = router;