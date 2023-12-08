import { config } from 'dotenv';
import Portkey from '../src';

config({ override: true })

// Initialize the Portkey client
const portkey = new Portkey({
    apiKey: process.env["PORTKEY_API_KEY"] ?? "",
    baseURL: "https://api.portkeydev.com/v1",
    provider: "openai",
    virtualKey: process.env["OPENAI_VIRTUAL_KEY"] ?? ""
});

// Generate a text completion
async function getTextCompletion() {
    const completion = await portkey.completions.create({
        prompt: "Say this is a test",
        model: "gpt-3.5-turbo-instruct",
    });

    console.log(completion.choices[0]?.text);
}
getTextCompletion();