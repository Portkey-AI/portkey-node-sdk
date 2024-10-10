import { ChatCompletionStreamParams } from 'openai/lib/ChatCompletionStream';
import { ApiClientInterface } from '../_types/generalTypes';
import { ApiResource } from '../apiResource';
import { RequestOptions } from '../baseClient';
import { initOpenAIClient, overrideConfig } from '../utils';
import { createHeaders } from './createHeaders';
import {
  ChatCompletionFunctionRunnerParams,
  ChatCompletionToolRunnerParams,
} from 'openai/lib/ChatCompletionRunner';
import {
  ChatCompletionStreamingFunctionRunnerParams,
  ChatCompletionStreamingToolRunnerParams,
} from 'openai/lib/ChatCompletionStreamingRunner';
import { ChatCompletionParseParams } from 'openai/resources/beta/chat/completions';

export class BetaChat extends ApiResource {
  completions: Completions;

  constructor(client: any) {
    super(client);
    this.completions = new Completions(client);
  }
}

export class Completions extends ApiResource {
  async parse<Params extends ChatCompletionParseParams>(
    _body: Params,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: Params = _body;

    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.beta.chat.completions.parse(body, opts);
    return result;
  }

  async runFunctions<FunctionsArgs extends BaseFunctionsArgs>(
    body: ChatCompletionFunctionRunnerParams<FunctionsArgs>,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any>;
  async runFunctions<FunctionsArgs extends BaseFunctionsArgs>(
    body: ChatCompletionStreamingFunctionRunnerParams<FunctionsArgs>,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any>;
  async runFunctions<FunctionsArgs extends BaseFunctionsArgs>(
    _body:
      | ChatCompletionFunctionRunnerParams<FunctionsArgs>
      | ChatCompletionStreamingFunctionRunnerParams<FunctionsArgs>,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: any = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.beta.chat.completions.runFunctions(
      body,
      opts
    );
    return result;
  }

  async runTools<FunctionsArgs extends BaseFunctionsArgs>(
    body: ChatCompletionToolRunnerParams<FunctionsArgs>,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any>;
  async runTools<FunctionsArgs extends BaseFunctionsArgs>(
    body: ChatCompletionStreamingToolRunnerParams<FunctionsArgs>,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any>;
  async runTools<FunctionsArgs extends BaseFunctionsArgs>(
    _body:
      | ChatCompletionToolRunnerParams<FunctionsArgs>
      | ChatCompletionStreamingToolRunnerParams<FunctionsArgs>,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: any = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.beta.chat.completions.runTools(body, opts);
    return result;
  }

  async stream(
    _body: ChatCompletionStreamParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: ChatCompletionStreamParams = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.beta.chat.completions.stream(body, opts);
    return result;
  }
}

export type BaseFunctionsArgs = readonly (object | string)[];
