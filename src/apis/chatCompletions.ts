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
import { Metadata, CursorPageParams } from '../_types/sharedTypes';

export class Chat extends ApiResource {
  completions: ChatCompletions = new ChatCompletions(this.client);
}

class ChatCompletions extends ApiResource {
  messages = new ChatCompletionsMessages(this.client);

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

  retrieve(
    completionId: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ChatCompletion> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    return this.getMethod<ChatCompletion>(
      `${CHAT_COMPLETE_API}/${completionId}`,
      {
        ...opts,
      }
    );
  }

  update(
    completionId: string,
    _body: ChatCompletionUpdateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ChatCompletion> {
    const body = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    return this.post<ChatCompletion>(`${CHAT_COMPLETE_API}/${completionId}`, {
      body,
      ...opts,
    });
  }

  list(
    query?: ChatCompletionListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ChatCompletionListResponse> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    return this.getMethod<ChatCompletionListResponse>(`${CHAT_COMPLETE_API}`, {
      ...opts,
      ...query,
    });
  }

  del(
    completionId: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ChatCompletion> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    return this.deleteMethod<ChatCompletion>(
      `${CHAT_COMPLETE_API}/${completionId}`,
      {
        ...opts,
      }
    );
  }
}

export class ChatCompletionsMessages extends ApiResource {
  list(
    completionId: string,
    query?: MessageListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    return this.getMethod<any>(
      `${CHAT_COMPLETE_API}/${completionId}/messages`,
      {
        ...opts,
        ...query,
      }
    );
  }
}

export interface ChatCompletionsBodyBase extends ModelParams {
  messages?: Array<Message>;
  response_format?: object;
  audio?: any | null;
  modalities?: Array<any> | null;
  prediction?: any | null;
  reasoning_effort?: any;
  store?: boolean | null;
  metadata?: Record<string, string> | null;
  max_completion_tokens?: number | null;
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

export interface Usage {
  prompt_tokens?: number;
  completion_tokens?: number;
  total_tokens?: number;
  [key: string]: any;
}

export interface Message {
  role: string;
  content: string | Array<any>;
  refusal?: string;
  function_call?: any;
  tool_calls?: Array<ChatCompletionMessageToolCall>;
  tool_call_id?: string;
  [key: string]: any;
}

export interface Logprobs {
  content: Array<ChatCompletionTokenLogprob> | null;
  refusal: Array<ChatCompletionTokenLogprob> | null;
  [key: string]: any;
}

export interface Choices {
  index?: number;
  message?: Message;
  delta?: Message;
  finish_reason?: string;
  logprobs?: Logprobs;
  [key: string]: any;
}

export interface ChatCompletion extends APIResponseType {
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

export interface ChatCompletionResponse {
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

export interface ChatCompletionUpdateParams {
  metadata: Metadata | null;
}

export interface ChatCompletionListParams extends CursorPageParams {
  metadata?: Metadata | null;
  model?: string;
  order?: 'asc' | 'desc';
}

export interface ChatCompletionListResponse extends APIResponseType {
  data: Array<ChatCompletion>;
  object: string;
}

export interface MessageListParams extends CursorPageParams {
  order?: 'asc' | 'desc';
}
