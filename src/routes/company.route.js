const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');

router.post("/create", verifyToken, verifyIsAdmin, companyController.createCompany);
router.get("/get", verifyToken, companyController.getMyCompany);
router.get("/get-all", verifyToken, verifyIsAdmin, companyController.getCompanys);
router.get("/get-one/:id", verifyToken, verifyIsAdmin, companyController.getOneCompany);

module.exports = router;