import express, { Request, Response } from "express";
import { ResizeImageReqDto } from "../../dto";
import { loggerMiddleware } from "../../middleware";
import { resizeImageService } from "../../services";

const resizeImage = express.Router();

resizeImage.get("/", loggerMiddleware, async (req: Request, res: Response) => {
  const { file_name = "", width = 0, height = 0 } = req.query;
  const queryData: ResizeImageReqDto = {
    fileName: String(file_name),
    width: Number(width),
    height: Number(height),
  };

  const result = await resizeImageService(queryData);
  if (result.error) {
    return res.status(result.status).send(result.error);
  }
  res.contentType("image/jpeg");
  return res.status(200).send(result.data);
});

export default resizeImage;
