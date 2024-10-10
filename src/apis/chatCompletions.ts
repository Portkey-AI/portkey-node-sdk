import {
  ChatCompletionMessageToolCall,
  ChatCompletionStreamOptions,
  ChatCompletionTokenLogprob,
} from 'openai/resources/chat/completions';
import { APIResponseType, ApiClientInterface } from '../_types/generalTypes';
import { ModelParams } from '../_types/portkeyConstructs';
import { ApiResource } from '../apiResource';
import { APIPromise, RequestOptions } from '../baseClient';
import { CHAT_COMPLETE_API } from '../constants';
import { Stream } from '../streaming';
import { overrideConfig } from '../utils';
import { createHeaders } from './createHeaders';

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
    opts?: RequestOptions
  ): APIPromise<Stream<ChatCompletion> | ChatCompletion>;
  create(
    _body: ChatCompletionCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ChatCompletion> | APIPromise<Stream<ChatCompletion>> {
    const body = _body;
    // If config is present then override it.
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const stream = _body.stream ?? false;
    return this.post<ChatCompletion>(CHAT_COMPLETE_API, {
      body,
      ...opts,
      stream,
    }) as APIPromise<ChatCompletion> | APIPromise<Stream<ChatCompletion>>;
  }
}

export interface ChatCompletionsBodyBase extends ModelParams {
  messages?: Array<Message>;
  response_format?: object;
}

export interface ChatCompletionsBodyStreaming extends ChatCompletionsBodyBase {
  stream?: true;
  stream_options?: ChatCompletionStreamOptions;
}

export interface ChatCompletionsBodyNonStreaming
  extends ChatCompletionsBodyBase {
  stream?: false;
}

export type ChatCompletionCreateParams =
  | ChatCompletionsBodyNonStreaming
  | ChatCompletionsBodyStreaming;

interface Usage {
  prompt_tokens?: number;
  completion_tokens?: number;
  total_tokens?: number;
  [key: string]: any;
}

interface Message {
  role: string;
  content: string;
  refusal?: string;
  function_call?: any;
  tool_calls?: Array<ChatCompletionMessageToolCall>;
  tool_call_id?: string;
}

export interface Logprobs {
  content: Array<ChatCompletionTokenLogprob> | null;
  refusal: Array<ChatCompletionTokenLogprob> | null;
  [key: string]: any;
}

interface Choices {
  index?: number;
  message?: Message;
  delta?: Message;
  finish_reason?: string;
  logprobs?: Logprobs;
  [key: string]: any;
}

interface ChatCompletion extends APIResponseType {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<Choices>;
  usage: Usage;
  service_tier?: string;
  system_fingerprint?: string;
  [key: string]: any;
}
