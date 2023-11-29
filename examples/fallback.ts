// import { Portkey } from "../src";

// const portkey = new Portkey({
//     apiKey:"your-portkey-api-key",
//     mode: "fallback",
//     llms: [
//         { provider: "openai", virtual_key: "open-ai-key-1234", trace_id: "1234", metadata: { hello: "world" } },
//         { provider: "cohere", virtual_key: "cohere-api-key-1234", trace_id: "1234", metadata: { hello: "world" } },
//     ]
// });

// async function main() {
//     const chatCompletion = await portkey.chatCompletions.create({
//         messages: [{ role: 'user', content: 'Say this is a test' }],
//     });

//     console.log(chatCompletion.choices);
// };

// main();