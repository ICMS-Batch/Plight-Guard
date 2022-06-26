import express from "express";
import reportsController from "../controllers/reports.controller";
import validator, { ValidationSource } from "../utils/validator";
import reportValidation from "../validations/report.validation";

const router = express.Router();

router
  .route("/")
  .post(
    validator(reportValidation.createReport, ValidationSource.BODY),
    reportsController.createReport
  )
  .get(reportsController.getAll);

export default router;
