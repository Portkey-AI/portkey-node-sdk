import { Portkey } from "../src";

const client = new Portkey({
    mode: "fallback",
    llms: [{
        provider: "openai",
        virtual_key: "openai-v"
    }]
});

const messages = [
    { content: "You want to talk in rhymes.", role: "system" },
    { content: "Hello, world!", role: "user" },
    { content: "Hello!", role: "assistant" },
    {
        content:
            "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
        role: "user",
    },
]

const prompt = "write a story about a king"

async function main() {
    const params = {}
    const res = await client.chatCompletions.create({ messages, ...params, stream: true })
    for await (const completion of res) {
        process.stdout.write(completion.choices[0]?.delta?.content || "");
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
