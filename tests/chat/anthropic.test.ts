import { config } from 'dotenv';
import { Portkey } from 'portkey-ai';

config({ override: true })
const client = new Portkey({
    apiKey: process.env["PORTKEY_API_KEY"] ?? "",
    baseURL: "https://api.portkeydev.com",
    provider: "openai",
    virtualKey: process.env["ANTHROPIC_VIRTUAL_KEY"] ?? ""
});

describe('Anthropic ChatCompletions APIs', () => {
    test('model: claude-instant-1.2', async () => {
        const completion = await client.chat.completions.create({ model: 'claude-instant-1.2', messages: [{ "role": "user", "content": "Say this is a test" }], max_tokens: 275 });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: claude-1', async () => {
        const completion = await client.chat.completions.create({ model: 'claude-1', messages: [{ "role": "user", "content": "Say this is a test" }], max_tokens: 275 });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: claude-1-100k', async () => {
        const completion = await client.chat.completions.create({ model: 'claude-1-100k', messages: [{ "role": "user", "content": "Say this is a test" }], max_tokens: 275 });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: claude-instant-1', async () => {
        const completion = await client.chat.completions.create({ model: 'claude-instant-1', messages: [{ "role": "user", "content": "Say this is a test" }], max_tokens: 275 });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: claude-instant-1-100k', async () => {
        const completion = await client.chat.completions.create({ model: 'claude-instant-1-100k', messages: [{ "role": "user", "content": "Say this is a test" }], max_tokens: 275 });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: claude-1.3', async () => {
        const completion = await client.chat.completions.create({ model: 'claude-1.3', messages: [{ "role": "user", "content": "Say this is a test" }], max_tokens: 275 });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: claude-1.3-100k', async () => {
        const completion = await client.chat.completions.create({ model: 'claude-1.3-100k', messages: [{ "role": "user", "content": "Say this is a test" }], max_tokens: 275 });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: claude-1.2', async () => {
        const completion = await client.chat.completions.create({ model: 'claude-1.2', messages: [{ "role": "user", "content": "Say this is a test" }], max_tokens: 275 });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: claude-1.0', async () => {
        const completion = await client.chat.completions.create({ model: 'claude-1.0', messages: [{ "role": "user", "content": "Say this is a test" }], max_tokens: 275 });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: claude-instant-1.1', async () => {
        const completion = await client.chat.completions.create({ model: 'claude-instant-1.1', messages: [{ "role": "user", "content": "Say this is a test" }], max_tokens: 275 });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: claude-instant-1.1-100k', async () => {
        const completion = await client.chat.completions.create({ model: 'claude-instant-1.1-100k', messages: [{ "role": "user", "content": "Say this is a test" }], max_tokens: 275 });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: claude-instant-1.0', async () => {
        const completion = await client.chat.completions.create({ model: 'claude-instant-1.0', messages: [{ "role": "user", "content": "Say this is a test" }], max_tokens: 275 });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: claude-2', async () => {
        const completion = await client.chat.completions.create({ model: 'claude-2', messages: [{ "role": "user", "content": "Say this is a test" }], max_tokens: 275 });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

});