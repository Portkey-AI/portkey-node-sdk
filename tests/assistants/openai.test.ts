import { config } from 'dotenv';
import { Portkey } from 'portkey-ai';

config({ override: true })
const client = new Portkey({
    apiKey: process.env["PORTKEY_API_KEY"] ?? "",
    virtualKey: process.env["OPENAI_VIRTUAL_KEY"] ?? ""
});

describe('OpenAI Assistants APIs', () => {
    test('assistant: create: documentation', async () => {
        const myAssistant = await client.beta.assistants.create({
            instructions:
              "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
            name: "Math Tutor",
            tools: [{ type: "code_interpreter" }],
            model: "gpt-4",
          });
        expect(myAssistant).toBeDefined();
        expect(myAssistant.tools).toBeDefined();
        expect(myAssistant.tools.length).toBeGreaterThan(0);
    });

});