import express from "express";
import resizeImage from "./modules/resize-image/route/resize-image.route";
const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("Default route api");
});

routes.use("/resize-image", resizeImage);

export default routes;
