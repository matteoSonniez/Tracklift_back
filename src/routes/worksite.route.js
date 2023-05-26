const express = require('express');
const router = express.Router();
const workSiteController = require('../controllers/worksite.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');

router.post("/create", verifyToken, verifyIsAdmin, workSiteController.createWorksite);

module.exports = router;