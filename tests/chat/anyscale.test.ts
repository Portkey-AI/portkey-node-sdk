import { config } from 'dotenv';
import { Portkey } from 'portkey-ai';

config({ override: true })
const client = new Portkey({
    apiKey: process.env["PORTKEY_API_KEY"] ?? "",
    virtualKey: process.env["ANYSCALE_VIRTUAL_KEY"] ?? ""
});

describe('Anyscale ChatCompletions APIs', () => {
    test('model: meta-llama/Llama-2-7b-chat-hf', async () => {
        const completion = await client.chat.completions.create({ model: 'meta-llama/Llama-2-7b-chat-hf', messages: [{ "role": "user", "content": "Say this is a test" }] });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: meta-llama/Llama-2-13b-chat-hf', async () => {
        const completion = await client.chat.completions.create({ model: 'meta-llama/Llama-2-13b-chat-hf', messages: [{ "role": "user", "content": "Say this is a test" }] });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: meta-llama/Llama-2-70b-chat-hf', async () => {
        const completion = await client.chat.completions.create({ model: 'meta-llama/Llama-2-70b-chat-hf', messages: [{ "role": "user", "content": "Say this is a test" }] });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: codellama/CodeLlama-34b-Instruct-hf', async () => {
        const completion = await client.chat.completions.create({ model: 'codellama/CodeLlama-34b-Instruct-hf', messages: [{ "role": "user", "content": "Say this is a test" }] });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });

    test('model: mistralai/Mistral-7B-Instruct-v0.1', async () => {
        const completion = await client.chat.completions.create({ model: 'mistralai/Mistral-7B-Instruct-v0.1', messages: [{ "role": "user", "content": "Say this is a test" }] });
        expect(completion).toBeDefined();
        expect(completion.choices).toBeDefined();
        expect(completion.choices.length).toBeGreaterThan(0);
    });
});