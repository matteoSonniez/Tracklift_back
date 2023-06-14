const express = require('express');
const router = express.Router();
const authRouter = require("./auth.route");
const userRouter = require('./user.route');
const companyRoute = require('./company.route');
const worksiteRoute = require('./worksite.route');
const elevatorRoute = require('./elevator.route');
const missionRouter = require('./mission.route');
const activityRouter = require('./activity.route');
const skillRouter = require('./skill.route');
const propositionRouter = require('./proposition.route');
const freelanceRouter = require('./freelance.route');
const wasteRouter = require('./waste.route');

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/company", companyRoute);
router.use("/worksite", worksiteRoute);
router.use("/elevator", elevatorRoute);
router.use("/mission", missionRouter);
router.use("/skill", skillRouter);
router.use("/activity", activityRouter);
router.use("/proposition", propositionRouter);
router.use("/freelance", freelanceRouter);
router.use("/waste", wasteRouter);

module.exports = router;