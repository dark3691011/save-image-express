import express, { Request, Response } from "express";
import sharp from "sharp";
import fs from "fs";
import errorMessage from "../../errors";
import { ResizeImageDto } from "../../dto";
import { loggerMiddleware } from "../../middleware";

const resizeImage = express.Router();

resizeImage.get("/", loggerMiddleware, async (req: Request, res: Response) => {
  const { file_name = "", width = 0, height = 0 } = req.query;
  const queryData: ResizeImageDto = {
    fileName: String(file_name),
    width: Number(width),
    height: Number(height),
  };

  if (!queryData.fileName || !queryData.width || !queryData.height) {
    return res.status(403).send(errorMessage.INPUT_FOR_IMAGE_IS_NOT_EMPTY);
  }
  if (isNaN(queryData.width) || isNaN(queryData.height)) {
    return res.status(403).send(errorMessage.INVALID_IMAGE_INPUT);
  }

  try {
    const resizedImagePath = `assets/image/thumb/${queryData.fileName}-${width}-${height}.jpg`;
    if (fs.existsSync(resizedImagePath)) {
      const existResizedImage = await fs.promises.readFile(resizedImagePath);
      res.contentType("image/jpeg");
      return res.status(200).send(existResizedImage);
    }

    const originalImagePath = `assets/image/full/${queryData.fileName}.jpg`;
    if (!fs.existsSync(originalImagePath)) {
      return res
        .status(404)
        .send(
          errorMessage.IMAGE_NOT_FOUND.replace(
            "<name>",
            req.query?.fileName?.toString() || "unknown",
          ),
        );
    }
    const resizedImage = await sharp(originalImagePath)
      .resize({
        width: queryData.width,
        height: queryData.height,
      })
      .toFormat("jpg", { mozjpeg: true })
      .toBuffer();
    fs.promises.writeFile(resizedImagePath, resizedImage);

    res.contentType("image/jpeg");
    res.status(200).send(resizedImage);
  } catch (error) {
    res
      .status(403)
      .send(
        errorMessage.CAN_NOT_ACCESS_IMAGE.replace(
          "<name>",
          req.query?.fileName?.toString() || "unknown",
        ),
      );
  }
});

export default resizeImage;
