import { ModelParams } from "../_types/portkeyConstructs";
import { ApiResource } from "../apiResource";
import { APIPromise, RequestOptions } from "../baseClient";
import { Stream } from "../streaming";



export class Completions extends ApiResource {
    create(
        _body: CompletionsBodyNonStreaming,
        opts?: RequestOptions
    ): APIPromise<TextCompletion>;
    create(
        _body: CompletionsBodyStreaming,
        opts?: RequestOptions
    ): APIPromise<Stream<TextCompletion>>
    create(
        _body: CompletionsBodyBase,
        opts?: RequestOptions,
    ): APIPromise<Stream<TextCompletion> | TextCompletion>;
    create(
        _body: CompletionCreateParams,
        opts?: RequestOptions
    ): APIPromise<TextCompletion> | APIPromise<Stream<TextCompletion>> {
        const config = this.client.configSlug || {
            mode: this.client.mode,
            options: this.client.llms
        }
        const body = {
            config,
            params: { ..._body }
        }
        return this.post("/v1/complete", { body, ...opts, stream: _body.stream ?? false }) as
            | APIPromise<TextCompletion>
            | APIPromise<Stream<TextCompletion>>
    }
}


export interface CompletionsBodyBase extends ModelParams {
    prompt?: string;
}

export interface CompletionsBodyStreaming extends CompletionsBodyBase {
    stream?: true;
}

export interface CompletionsBodyNonStreaming extends CompletionsBodyBase {
    stream?: false;
}

export type CompletionCreateParams = CompletionsBodyNonStreaming | CompletionsBodyStreaming;

interface Usage {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
}

interface Choices {
    index?: number;
    text?: string;
    logprobs: any;
    finish_reason?: string;
}

interface TextCompletion {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Array<Choices>;
    usage?: Usage;
}