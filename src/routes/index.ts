import express from "express";
import resizeImage from "./api/resize-image";
const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("Default route api");
});

routes.use("/resize-image", resizeImage);

export default routes;
