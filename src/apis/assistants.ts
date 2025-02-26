import { Metadata } from '../_types/sharedTypes';
import { ApiClientInterface } from '../_types/generalTypes';
import { ApiResource } from '../apiResource';
import { RequestOptions } from '../baseClient';
import { finalResponse, initOpenAIClient, overrideConfig } from '../utils';
import { createHeaders } from './createHeaders';
import { AssistantUpdateParams as oaiAssistantUpdateParams } from 'openai/resources/beta/assistants';

export interface AssistantCreateParams {
  model: string;
  description?: string | null;
  instructions?: string | null;
  metadata?: Metadata | null;
  name?: string | null;
  tools?: Array<any>;
  response_format?: any | null;
  temperature?: number | null;
  tool_resources?: any | null;
  top_p?: number | null;
  [key: string]: any;
}

export interface FileCreateParams {
  file_id: string;
}

export interface FileListParams extends CursorPageParams {
  before?: string;
  order?: string;
}

export interface CursorPageParams {
  after?: string;
  limit?: number;
  [key: string]: any;
}

export interface AssistantListParams extends CursorPageParams {
  before?: string;
  order?: string;
}

export interface AssistantUpdateParams {
  description?: string | null;
  file_ids?: Array<string>;
  instructions?: string | null;
  metadata?: Metadata | null;
  model?: string;
  name?: string | null;
  tools?: Array<any>;
  response_format?: any | null;
  temperature?: number | null;
  tool_resources?: oaiAssistantUpdateParams.ToolResources | null;
  top_p?: number | null;
  [key: string]: any;
}

export class Assistants extends ApiResource {
  async create(
    _body: AssistantCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: AssistantCreateParams = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.beta.assistants
      .create(body, opts)
      .withResponse();

    return finalResponse(result);
  }

  async list(
    _query?: AssistantListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const query: AssistantListParams | undefined = _query;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await OAIclient.beta.assistants
      .list(query as any, opts)
      .withResponse();

    return finalResponse(result);
  }

  async retrieve(
    assistantId: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.beta.assistants
      .retrieve(assistantId, opts)
      .withResponse();

    return finalResponse(result);
  }

  async update(
    assistantId: string,
    _body: AssistantUpdateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: AssistantUpdateParams = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.beta.assistants
      .update(assistantId, body, opts)
      .withResponse();

    return finalResponse(result);
  }

  async del(
    assistantId: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.beta.assistants
      .del(assistantId, opts)
      .withResponse();

    return finalResponse(result);
  }
}
