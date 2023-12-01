import { config } from 'dotenv';
import { Portkey } from 'portkey-ai';

config({ override: true })
const client = new Portkey({
    apiKey: process.env["PORTKEY_API_KEY"] ?? "",
    baseURL: "https://api.portkeydev.com/v1",
    provider: "openai",
    virtualKey: process.env["OPENAI_VIRTUAL_KEY"] ?? ""
});

describe('Openai ChatCompletions APIs', () => {
    test('model: gpt-4-32k-0613', async () => {
        const completion = await client.chat.completions.create({ model: 'gpt-4-32k-0613', messages: [{ "role": "user", "content": "Say this is a test" }] });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: gpt-4-1106-preview', async () => {
        const completion = await client.chat.completions.create({ model: 'gpt-4-1106-preview', messages: [{ "role": "user", "content": "Say this is a test" }] });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: gpt-4', async () => {
        const completion = await client.chat.completions.create({ model: 'gpt-4', messages: [{ "role": "user", "content": "Say this is a test" }] });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: gpt-4-0314', async () => {
        const completion = await client.chat.completions.create({ model: 'gpt-4-0314', messages: [{ "role": "user", "content": "Say this is a test" }] });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: gpt-4-32k', async () => {
        const completion = await client.chat.completions.create({ model: 'gpt-4-32k', messages: [{ "role": "user", "content": "Say this is a test" }] });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: gpt-4-32k-0314', async () => {
        const completion = await client.chat.completions.create({ model: 'gpt-4-32k-0314', messages: [{ "role": "user", "content": "Say this is a test" }] });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: gpt-4-0613', async () => {
        const completion = await client.chat.completions.create({ model: 'gpt-4-0613', messages: [{ "role": "user", "content": "Say this is a test" }] });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: gpt-3.5-turbo-0613', async () => {
        const completion = await client.chat.completions.create({ model: 'gpt-3.5-turbo-0613', messages: [{ "role": "user", "content": "Say this is a test" }] });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: gpt-3.5-turbo-0301', async () => {
        const completion = await client.chat.completions.create({ model: 'gpt-3.5-turbo-0301', messages: [{ "role": "user", "content": "Say this is a test" }] });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: gpt-3.5-turbo-1106', async () => {
        const completion = await client.chat.completions.create({ model: 'gpt-3.5-turbo-1106', messages: [{ "role": "user", "content": "Say this is a test" }] });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: gpt-3.5-turbo-16k', async () => {
        const completion = await client.chat.completions.create({ model: 'gpt-3.5-turbo-16k', messages: [{ "role": "user", "content": "Say this is a test" }] });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: gpt-3.5-turbo', async () => {
        const completion = await client.chat.completions.create({ model: 'gpt-3.5-turbo', messages: [{ "role": "user", "content": "Say this is a test" }] });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

});