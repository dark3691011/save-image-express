import express from "express";
import sharp from "sharp";
import fs from "fs";

const app = express();
const PORT = 3000;

app.get("/", async (req, res) => {
  const resizedImagePath = "assets/image/thumb/santamonica_resize.jpg";
  const fileExists = fs.existsSync(resizedImagePath);
  if (fileExists) {
    const existResizedImage = await fs.promises.readFile(resizedImagePath);
    res.contentType("image/jpeg");
    return res.status(200).send(existResizedImage);
  }

  const originalImagePath = "assets/image/full/santamonica.jpg";
  const resizedImage = await sharp(originalImagePath)
    .resize({
      width: 200,
      height: 200,
    })
    .toFormat("jpg", { mozjpeg: true })
    .toBuffer();
  fs.promises.writeFile(resizedImagePath, resizedImage);

  res.contentType("image/jpeg");
  res.status(200).send(resizedImage);
});

app.listen(PORT, () => {
  console.log(
    "Server is Successfully Running,and App is listening on port " + PORT
  );
});
