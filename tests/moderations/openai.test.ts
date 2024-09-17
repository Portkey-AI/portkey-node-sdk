import { config } from 'dotenv';
import { Portkey } from 'portkey-ai';

config({ override: true })
const client = new Portkey({
    apiKey: process.env["PORTKEY_API_KEY"] ?? "",
    virtualKey: process.env["OPENAI_VIRTUAL_KEY"] ?? ""
});

describe('OpenAI Moderations APIs', () => {
    test('assistant: create: documentation', async () => {
        const moderation = await client.moderations.create({
            input: "I want to kill them.",
            model: "text-moderation-stable",
          });
        expect(moderation).toBeDefined();
        expect(moderation.id).toBeDefined();
        expect(moderation.results.length).toBeGreaterThan(0);
    });

});