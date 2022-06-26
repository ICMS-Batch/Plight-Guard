import express from "express";
import user from "./users.route";
import reports from "./reports.route";

const router = express.Router();

router.use("/users", user);
router.use("/reports", reports);

export default router;
