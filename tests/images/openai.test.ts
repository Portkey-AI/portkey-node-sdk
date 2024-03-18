import { config } from "dotenv";
import { Portkey } from "portkey-ai";
import fs from "fs";
import path from "path";

config({ override: true });
const client = new Portkey({
    apiKey: process.env["PORTKEY_API_KEY"] ?? "",
    virtualKey: process.env["OPENAI_VIRTUAL_KEY"] ?? ""
});

describe("Openai Images APIs", () => {
  test("generate: only required params", async () => {
    const response = await client.images.generate({
      prompt: "A cute baby sea otter",
    });
    expect(response).toBeDefined();
    expect(response.data).toBeDefined();
    expect(response.data.length).toBeGreaterThan(0);
  }, 120000);

  test("generate: only required params with model", async () => {
    const response = await client.images.generate({
      model: "dall-e-3",
      prompt: "A cute baby sea otter",
    });
    expect(response).toBeDefined();
    expect(response.data).toBeDefined();
    expect(response.data.length).toBeGreaterThan(0);
  }, 120000);

  test("createVariation: only required params", async () => {
    const imagePath = path.join(__dirname, 'image.png');
    const response = await client.images.createVariation({
      image: fs.createReadStream(imagePath),
    });
    expect(response).toBeDefined();
    expect(response.data).toBeDefined();
    expect(response.data.length).toBeGreaterThan(0);
  }, 120000);

  test("edit: only required params", async () => {
    const imagePath = path.join(__dirname, 'image.png');
    const imageMaskPath = path.join(__dirname, 'imageMask.png');
    const response = await client.images.edit({
      image: fs.createReadStream(imagePath),
      mask: fs.createReadStream(imageMaskPath),
      prompt:"A cute baby sea otter wearing a beret"
    });
    expect(response).toBeDefined();
    expect(response.data).toBeDefined();
    expect(response.data.length).toBeGreaterThan(0);
  }, 120000);

});
