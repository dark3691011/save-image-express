import supertest from "supertest";
import app from "../../app";
import errorMessage from "../../modules/resize-image/error";

const request = supertest(app);
describe("Test endpoint responses", () => {
  it("gets the api endpoint", async () => {
    const response = await request.get("/api");
    expect(response.status).toEqual(200);
  });

  it("succes case", async () => {
    const response = await request.get(
      "/api/resize-image?file_name=santamonica&width=500&height=200"
    );
    const check = Buffer.isBuffer(response.body);
    expect(response.status).toEqual(200);
    expect(check).toBeTrue();
  });

  it("case image not found", async () => {
    const response = await request.get(
      "/api/resize-image?file_name=santamonica123&width=500&height=200"
    );
    expect(response.status).toEqual(403);
    expect(response.text).toContain(errorMessage.IMAGE_NOT_FOUND);
  });
});
