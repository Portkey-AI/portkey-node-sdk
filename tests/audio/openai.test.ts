import { config } from "dotenv";
import { Portkey } from "portkey-ai";
import fs from "fs";
import path from "path";

config({ override: true });
const client = new Portkey({
    apiKey: process.env["PORTKEY_API_KEY"] ?? "",
    virtualKey: process.env["OPENAI_VIRTUAL_KEY"] ?? ""
});

describe("Openai Audio APIs", () => {
  test("Speech: only required params", async () => {

    const speechFile = path.resolve("./speech.mp3");
    const response = await client.audio.speech.create({
        model:"tts-1",
        voice:"alloy",
        input:"The quick brown fox jumps over the lazy dog"
    });
    const buffer = Buffer.from(await response.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);
    expect(response).toBeDefined();
  });


  test("Transcription: only required params", async () => {
    const transcription = await client.audio.transcriptions.create({
        file: fs.createReadStream("./speech.mp3"),
        model: "whisper-1",
      });
    expect(transcription).toBeDefined();
    expect(transcription.text).toBeDefined();
  });

  test("Translation: only required params", async () => {
    const transcription = await client.audio.translations.create({
        file: fs.createReadStream("./speech.mp3"),
        model: "whisper-1",
      });
    expect(transcription).toBeDefined();
    expect(transcription.text).toBeDefined();
  });

});
