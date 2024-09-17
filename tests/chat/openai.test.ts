import { config } from 'dotenv';
import { Portkey } from 'portkey-ai';

config({ override: true })
const client = new Portkey({
    apiKey: process.env["PORTKEY_API_KEY"] ?? "",
    virtualKey: process.env["OPENAI_VIRTUAL_KEY"] ?? ""
});

describe('Openai ChatCompletions APIs', () => {
    test('model: gpt-4-0125-preview', async () => {
        const completion = await client.chat.completions.create({ model: 'gpt-4-0125-preview', messages: [{ "role": "user", "content": "Say this is a test" }] });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: gpt-4-turbo-preview', async () => {
        const completion = await client.chat.completions.create({ model: 'gpt-4-turbo-preview', messages: [{ "role": "user", "content": "Say this is a test" }] });
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

    test('model: gpt-4-vision-preview', async () => {
        const completion = await client.chat.completions.create({ model: 'gpt-4-vision-preview', messages: [{ "role": "user", "content": "Say this is a test" }] });
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

    test('model: gpt-4-0613', async () => {
        const completion = await client.chat.completions.create({ model: 'gpt-4-0613', messages: [{ "role": "user", "content": "Say this is a test" }] });
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

    test('model: gpt-3.5-turbo-0125', async () => {
        const completion = await client.chat.completions.create({ model: 'gpt-3.5-turbo-0125', messages: [{ "role": "user", "content": "Say this is a test" }] });
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

        test('model: gpt-4-turbo-2024-04-09', async () => {
        const completion = await client.chat.completions.create({ model: 'gpt-4-turbo-2024-04-09', messages: [{ "role": "user", "content": "Say this is a test" }] });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });
});