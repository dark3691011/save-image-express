import fs from "fs";
import sharp from "sharp";
import { ResizeImageReqDto, ResizeImageResDto } from "../dto";
import errorMessage from "../error";

export const resizeImageFunc = async (
  queryData: ResizeImageReqDto
): Promise<ResizeImageResDto> => {
  if (!queryData.fileName || !queryData.width || !queryData.height) {
    return {
      status: 403,
      error: errorMessage.INPUT_FOR_IMAGE_IS_NOT_EMPTY,
    };
  }
  if (isNaN(queryData.width) || isNaN(queryData.height)) {
    return {
      status: 403,
      error: errorMessage.INVALID_IMAGE_INPUT,
    };
  }

  try {
    const resizedImagePath = `assets/image/thumb/${queryData.fileName}-${queryData.width}-${queryData.height}.jpg`;
    if (fs.existsSync(resizedImagePath)) {
      const existResizedImage = await fs.promises.readFile(resizedImagePath);

      return {
        status: 200,
        data: existResizedImage,
      };
    }

    const originalImagePath = `assets/image/full/${queryData.fileName}.jpg`;
    if (!fs.existsSync(originalImagePath)) {
      return {
        status: 403,
        error:
          errorMessage.IMAGE_NOT_FOUND + `: ${queryData.fileName?.toString()}`,
      };
    }
    const resizedImage = await sharp(originalImagePath)
      .resize({
        width: queryData.width,
        height: queryData.height,
      })
      .toFormat("jpg", { mozjpeg: true })
      .toBuffer();
    fs.promises.writeFile(resizedImagePath, resizedImage);

    return {
      status: 200,
      data: resizedImage,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 403,
      error:
        errorMessage.CAN_NOT_ACCESS_IMAGE +
        `: ${queryData.fileName?.toString()}`,
    };
  }
};
