import { ApiClientInterface } from "../_types/generalTypes";
import { ModelParams } from "../_types/portkeyConstructs";
import { ApiResource } from "../apiResource";
import { APIPromise, RequestOptions } from "../baseClient";
import { CHAT_COMPLETE_API } from "../constants";
import { Stream } from "../streaming";
import { overrideParams } from "../utils";


export class Chat extends ApiResource {
    completions: ChatCompletions = new ChatCompletions(this.client);
}

class ChatCompletions extends ApiResource {
    create(
        _body: ChatCompletionsBodyNonStreaming,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<ChatCompletion>;
    create(
        _body: ChatCompletionsBodyStreaming,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<Stream<ChatCompletion>>;
    create(
        _body: ChatCompletionsBodyBase,
        params?: ApiClientInterface,
        opts?: RequestOptions,
    ): APIPromise<Stream<ChatCompletion> | ChatCompletion>;
    create(
        _body: ChatCompletionCreateParams,
        params?: ApiClientInterface,
        opts?: RequestOptions
    ): APIPromise<ChatCompletion> | APIPromise<Stream<ChatCompletion>> {
        const body = _body
        // If config is present then override it.
        if (params){
            this.client = overrideParams(this.client, params)
        }
        const stream = _body.stream ?? false
        return this.post<ChatCompletion>(CHAT_COMPLETE_API, { body, ...opts, stream }) as
            | APIPromise<ChatCompletion>
            | APIPromise<Stream<ChatCompletion>>
    }
}

export interface ChatCompletionsBodyBase extends ModelParams {
    messages?: Array<Message>;
}

export interface ChatCompletionsBodyStreaming extends ChatCompletionsBodyBase {
    stream?: true;
}

export interface ChatCompletionsBodyNonStreaming extends ChatCompletionsBodyBase {
    stream?: false;
}

export type ChatCompletionCreateParams = ChatCompletionsBodyNonStreaming | ChatCompletionsBodyStreaming;

interface Usage {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
}

interface Message {
    role: string
    content: string
}

interface Choices {
    index?: number;
    message?: Message;
    delta?: Message
    finish_reason?: string;
}

interface ChatCompletion {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Array<Choices>;
    usage: Usage;
}