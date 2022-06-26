import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import routes from "./routes";
import { ApiError } from "./core/ApiError";
import { BadRequestResponse, NotFoundResponse } from "./core/ApiResponse";
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.static(__dirname));
app.use(express.json());

app.use("/v1", routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    console.log("error", err);
    new BadRequestResponse(err.message).send(res);
  }
});

app.get("*", function (req, res) {
  new NotFoundResponse("Endpoint doesn't exist").send(res);
});

export default app;
