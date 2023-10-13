import { ModelParams } from "../_types/portkeyConstructs";
import { ApiResource } from "../apiResource";
import { APIPromise, RequestOptions } from "../baseClient";
import { Stream } from "../streaming";

export class ChatCompletions extends ApiResource {
    create(
        _body: ChatCompletionsBodyNonStreaming,
        opts?: RequestOptions
    ): APIPromise<ChatCompletion>;
    create(
        _body: ChatCompletionsBodyStreaming,
        opts?: RequestOptions
    ): APIPromise<Stream<ChatCompletion>>;
    create(
        _body: ChatCompletionsBodyBase,
        opts?: RequestOptions,
    ): APIPromise<Stream<ChatCompletion> | ChatCompletion>;
    create(
        _body: ChatCompletionCreateParams,
        opts?: RequestOptions
    ): APIPromise<ChatCompletion> | APIPromise<Stream<ChatCompletion>> {
        const config = this.client.configSlug || {
            mode: this.client.mode,
            options: this.client.llms
        }
        const body = {
            config,
            params: { ..._body }
        }
        return this.post<ChatCompletion>("/v1/chatComplete", { body, ...opts, stream: _body.stream ?? false }) as
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