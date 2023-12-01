import { ModelParams } from "../_types/portkeyConstructs";
import { ApiResource } from "../apiResource";
import { APIPromise, RequestOptions } from "../baseClient";
import { TEXT_COMPLETE_API } from "../constants";
import { Stream } from "../streaming";
import { overrideConfig } from "../utils";



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
        const body = _body
        // If config is present then override it.
        this.client.config = overrideConfig(this.client.config, opts?.config)
        delete opts?.config
        const stream = _body.stream ?? false
        return this.post(TEXT_COMPLETE_API, { body, ...opts, stream }) as
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