const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skill.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');

router.get("/", skillController.getSkills);
router.post("/", verifyToken, verifyIsAdmin, skillController.createSkill);
router.put("/:id", verifyToken, verifyIsAdmin, skillController.updateSkill);
router.delete("/:id", verifyToken, verifyIsAdmin, skillController.removeSkill);

module.exports = router;