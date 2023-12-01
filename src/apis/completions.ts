import { ApiClientInterface } from "../_types/generalTypes";
import { ModelParams } from "../_types/portkeyConstructs";
import { ApiResource } from "../apiResource";
import { APIPromise, RequestOptions } from "../baseClient";
import { TEXT_COMPLETE_API } from "../constants";
import { Stream } from "../streaming";
import { overrideConfig } from "../utils";
import { createHeaders } from "./createHeaders";


export class Completions extends ApiResource {
    create(
        _body: CompletionsBodyNonStreaming,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<TextCompletion>;
    create(
        _body: CompletionsBodyStreaming,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<Stream<TextCompletion>>
    create(
        _body: CompletionsBodyBase,
        params?: ApiClientInterface,
        opts?: RequestOptions,
    ): APIPromise<Stream<TextCompletion> | TextCompletion>;
    create(
        _body: CompletionCreateParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<TextCompletion> | APIPromise<Stream<TextCompletion>> {
        const body = _body
        // If config is present then override it.
        if (params) {
            const config = overrideConfig(this.client.config, params.config)
            this.client.customHeaders = { ...this.client.customHeaders, ...createHeaders({ ...params, config }) }
        }
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