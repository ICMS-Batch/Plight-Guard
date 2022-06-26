import app from "./app";
import http from "http";
import config from "./config";

const httpServer = http.createServer(app);

const PORT = config.PORT;

httpServer.listen(PORT, () => {
  console.log("Listening at port ", PORT);
});
