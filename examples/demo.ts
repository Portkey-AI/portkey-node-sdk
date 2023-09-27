import { Portkey } from "../src";

const client = new Portkey({
    apiKey: "<>",
    baseURL: "https://api.portkey.ai",
    mode: "single",
    llms: [{
        provider: "openai",
        virtual_key: "open-ai-key-1234",
        model: "text-davinci-003",
        max_tokens: 2000
    }]
})

const messages = [{
    "role": "user",
    "content": "write a story"
}]

const prompt = "write a story about a king"

async function main() {
    const res = await client.completions.create({ prompt, stream: true })
    for await (const completion of res) {
        process.stdout.write(completion.choices[0]?.text || "");
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
