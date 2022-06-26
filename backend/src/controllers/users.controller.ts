import asyncHandler from "../utils/asyncHandler";
import prismaClient from "../db/prisma";
import { comparePassword, createHash } from "../utils/hash";
import { AuthFailureError, BadRequestError } from "../core/ApiError";
import { omit } from "lodash";
import { SuccessResponse } from "../core/ApiResponse";

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await prismaClient.user.findFirst({
    where: { email },
  });

  if (!foundUser) throw new AuthFailureError("User doesn't exists");
  const isVerified = comparePassword(foundUser.password, password);

  if (!isVerified) throw new AuthFailureError("Incorrect password");

  return new SuccessResponse("Login Success", foundUser).send(res);
});

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, ...rest } = req.body;
  const foundUser = await prismaClient.user.findFirst({ where: { email } });
  if (foundUser) throw new BadRequestError("User already exists");
  const hashedPassword = await createHash(password);
  const newUser = await prismaClient.user.create({
    data: {
      email,
      password: hashedPassword,
      ...rest,
    },
  });

  const result = omit(newUser, ["password", "id", "createdAt"]);

  return new SuccessResponse("User registration Success", result).send(res);
});

export default {
  loginUser,
  registerUser,
};
