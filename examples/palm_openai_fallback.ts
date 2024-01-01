import { Portkey } from "portkey-ai";

const portkey = new Portkey({
    mode: "fallback",
    llms: [
        {
            provider: "palm", virtual_key: "...",
            override_params: { model: "models/chat-bison-001" }
        },
        {
            provider: "openai", virtual_key: "...",
            override_params: { model: "gpt-4" }
        }

    ]
});

async function main() {
    const response = await portkey.chatCompletions.create({
        messages: [{ role: 'user', content: 'C\'est la vie' }],
    });

    console.log(response.choices);
};

main();
