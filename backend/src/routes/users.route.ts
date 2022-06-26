import express from "express";
import userController from "../controllers/users.controller";
import userValidation from "../validations/user.validation";
import validator, { ValidationSource } from "../utils/validator";
const router = express.Router();

router
  .route("/login")
  .post(
    validator(userValidation.loginCredentials, ValidationSource.BODY),
    userController.loginUser
  );

router
  .route("/register")
  .post(
    validator(userValidation.registerCredentials, ValidationSource.BODY),
    userController.registerUser
  );

export default router;
