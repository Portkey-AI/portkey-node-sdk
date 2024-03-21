import { config } from 'dotenv';
import { Portkey } from 'portkey-ai';

config({ override: true })
const client = new Portkey({
    apiKey: process.env["PORTKEY_API_KEY"] ?? "",
    virtualKey: process.env["ANTHROPIC_VIRTUAL_KEY"] ?? ""
});

describe('Anthropic ChatCompletions APIs', () => {
    test('model: claude-2.1', async () => {
        const completion = await client.chat.completions.create({ model: 'claude-2.1', messages: [{ "role": "user", "content": "Say this is a test" }], max_tokens: 275 });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: claude-2.0', async () => {
        const completion = await client.chat.completions.create({ model: 'claude-2.0', messages: [{ "role": "user", "content": "Say this is a test" }], max_tokens: 275 });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: claude-instant-1.2', async () => {
        const completion = await client.chat.completions.create({ model: 'claude-instant-1.2', messages: [{ "role": "user", "content": "Say this is a test" }], max_tokens: 275 });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });
});