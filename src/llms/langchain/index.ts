import _ from "lodash";
import { BaseLLM } from "langchain/llms/base";
import { GenerationChunk, LLMResult } from "langchain/schema"
import { PORTKEY_GATEWAY_URL } from "../../constants";
import { CallbackManagerForLLMRun } from "langchain/callbacks"
import { Portkey } from "../../../src"

/**
 * @example
 * ```typescript
 * const model = new Portkey({
 *   mode: "single",
 *   llms: [
 *     {
 *       provider: "openai",
 *       virtual_key: "open-ai-key-1234",
 *       model: "text-davinci-003",
 *       max_tokens: 2000,
 *     },
 *   ],
 * });
 *
 * // Stream the output of the model and process it
 * const res = await model.stream(
 *   "Question: Write a story about a king\nAnswer:"
 * );
 * for await (const i of res) {
 *   process.stdout.write(i);
 * }
 * ```
 */
export class PortkeyLangchain extends BaseLLM {
    apiKey: string | null | undefined;
    baseURL: string | undefined;
    virtualKey: string | null | undefined;
    config: Record<string, unknown> | string | null | undefined;
    provider: string | null | undefined;
    traceID: string | null | undefined;
    metadata_: Record<string, unknown> | null | undefined;
    client: Portkey;

    constructor(init?: Partial<PortkeyLangchain>) {
        super(init ?? {});
        this.apiKey = init?.apiKey ?? null;
        this.baseURL = init?.baseURL;
        this.virtualKey = init?.virtualKey
        this.config = init?.config
        this.baseURL = init?.baseURL || PORTKEY_GATEWAY_URL;
        this.provider = init?.provider
        this.traceID = init?.traceID
        this.metadata_ = init?.metadata
        this.client = new Portkey({
            apiKey: this.apiKey,
            baseURL: this.baseURL,
            virtualKey: this.virtualKey,
            config: this.config,
            provider: this.provider,
            traceID: this.traceID,
            metadata: this.metadata_
        })
    }

    _llmType() {
        return "portkey";
    }

    async _generate(
        prompts: string[],
        options: this["ParsedCallOptions"],
        _?: CallbackManagerForLLMRun
    ): Promise<LLMResult> {
        const choices = [];
        for (let i = 0; i < prompts.length; i += 1) {
            const response = await this.client.completions.create({
                prompt: prompts[i] ?? "",
                ...options,
                stream: false,
            });
            choices.push(response.choices);
        }
        const generations = choices.map((promptChoices) =>
            promptChoices.map((choice) => ({
                text: choice.text ?? "",
                generationInfo: {
                    finishReason: choice.finish_reason,
                    logprobs: choice.logprobs,
                },
            }))
        );

        return {
            generations,
        };
    }


    override async *_streamResponseChunks(
        input: string,
        options: this["ParsedCallOptions"],
        runManager?: CallbackManagerForLLMRun
    ): AsyncGenerator<GenerationChunk> {
        const response = await this.client.completions.create({
            prompt: input,
            ...options,
            stream: true,
        });
        for await (const data of response) {
            const choice = data?.choices[0];
            if (!choice) {
                continue;
            }
            const chunk = new GenerationChunk({
                text: choice.text ?? "",
                generationInfo: {
                    finishReason: choice.finish_reason,
                },
            });
            yield chunk;
            void runManager?.handleLLMNewToken(chunk.text ?? "");
        }
        if (options.signal?.aborted) {
            throw new Error("AbortError");
        }
    }
}
