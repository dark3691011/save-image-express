import errorMessage from "../../modules/resize-image/error";
import { resizeImageFunc } from "../../modules/resize-image/service";

describe("Test input image", () => {
  it("case success", async () => {
    const resResizeImage = await resizeImageFunc({
      height: 480,
      width: 720,
      fileName: "encenadaport",
    });
    expect(resResizeImage.status).toEqual(200);
  });

  it("case image not found", async () => {
    const resResizeImage = await resizeImageFunc({
      height: 480,
      width: 720,
      fileName: "encenadaport1",
    });
    expect(resResizeImage.error).toContain(errorMessage.IMAGE_NOT_FOUND);
  });

  it("case wrong height input data type", async () => {
    const resResizeImage = await resizeImageFunc({
      height: "text",
      width: 720,
      fileName: "encenadaport",
    } as any);
    expect(resResizeImage).toEqual({
      status: 403,
      error: errorMessage.INVALID_IMAGE_INPUT,
    });
  });

  it("case missing width", async () => {
    const resResizeImage = await resizeImageFunc({
      height: 480,
      fileName: "encenadaport",
    } as any);
    expect(resResizeImage).toEqual({
      status: 403,
      error: errorMessage.INPUT_FOR_IMAGE_IS_NOT_EMPTY,
    });
  });
});
