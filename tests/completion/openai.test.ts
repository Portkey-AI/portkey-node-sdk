import { config } from 'dotenv';
import { Portkey } from 'portkey-ai';

config({ override: true })
const client = new Portkey({
    apiKey: process.env["PORTKEY_API_KEY"] ?? "",
    baseURL: "https://api.portkey.ai/v1",
    provider: "openai",
    virtualKey: process.env["OPENAI_VIRTUAL_KEY"] ?? ""
});

describe('Completions APIs', () => {
    test('model: gpt-3.5-turbo-instruct', async () => {
        const completion = await client.completions.create({ model: 'gpt-3.5-turbo-instruct', prompt: 'This is a test.' });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: text-davinci-003', async () => {
        const completion = await client.completions.create({ model: 'text-davinci-003', prompt: 'This is a test.' });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: text-davinci-002', async () => {
        const completion = await client.completions.create({ model: 'text-davinci-002', prompt: 'This is a test.' });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: text-curie-001', async () => {
        const completion = await client.completions.create({ model: 'text-curie-001', prompt: 'This is a test.' });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: text-babbage-001', async () => {
        const completion = await client.completions.create({ model: 'text-babbage-001', prompt: 'This is a test.' });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: text-ada-001', async () => {
        const completion = await client.completions.create({ model: 'text-ada-001', prompt: 'This is a test.' });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: babbage-002', async () => {
        const completion = await client.completions.create({ model: 'babbage-002', prompt: 'This is a test.' });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: davinci-002', async () => {
        const completion = await client.completions.create({ model: 'davinci-002', prompt: 'This is a test.' });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: text-davinci-001', async () => {
        const completion = await client.completions.create({ model: 'text-davinci-001', prompt: 'This is a test.' });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

});