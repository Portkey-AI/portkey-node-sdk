import { config } from 'dotenv';
import { Portkey } from 'portkey-ai';

config({ override: true })
const client = new Portkey({
    apiKey: process.env["PORTKEY_API_KEY"] ?? "",
    virtualKey: process.env["OPENAI_VIRTUAL_KEY"] ?? ""
});

describe('Completions APIs', () => {
    test('model: gpt-3.5-turbo-instruct', async () => {
        const completion = await client.completions.create({ model: 'gpt-3.5-turbo-instruct', prompt: 'This is a test.' });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });
});