import { SuccessResponse } from "../core/ApiResponse";
import prismaClient from "../db/prisma";
import asyncHandler from "../utils/asyncHandler";

const createReport = asyncHandler(async (req, res) => {
  const payload = req.body;
  const newReport = await prismaClient.report.create({
    data: {
      ...payload,
    },
  });
  return new SuccessResponse("Report creation success", newReport).send(res);
});

const getAll = asyncHandler(async (req, res) => {
  const reports = await prismaClient.report.findMany({});
  return new SuccessResponse("Report Success", reports).send(res);
});

export default {
  createReport,
  getAll,
};
