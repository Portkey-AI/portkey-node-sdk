import { ApiResource } from '../apiResource';
import { createHeaders } from './createHeaders';
import { finalResponse, initOpenAIClient, overrideConfig } from '../utils';
import { ApiClientInterface } from '../_types/generalTypes';
import { APIPromise, RequestOptions } from '../baseClient';
import {
  Response,
  ResponseCreateParams,
  ResponseCreateParamsBase,
  ResponseCreateParamsNonStreaming,
  ResponseCreateParamsStreaming,
  ResponseStreamEvent,
} from 'openai/resources/responses/responses';
import { CursorPageParams } from '../_types/sharedTypes';
import { ResponseCreateParamsWithTools } from 'openai/lib/ResponsesParser';
import { ResponseStreamParams } from 'openai/lib/responses/ResponseStream';
import { Stream } from '../streaming';

export class Responses extends ApiResource {
  inputItems: InputItems;

  constructor(client: any) {
    super(client);
    this.inputItems = new InputItems(client);
  }

  create(
    body: ResponseCreateParamsNonStreaming,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<Response>;
  create(
    body: ResponseCreateParamsStreaming,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<Stream<ResponseStreamEvent>>;
  create(
    body: ResponseCreateParamsBase,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<Stream<ResponseStreamEvent> | Response>;
  create(
    body: ResponseCreateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<Response> | APIPromise<Stream<ResponseStreamEvent>> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = OAIclient.responses.create(body, opts);

    return result as any;
  }

  async retrieve(
    responseId: string,
    _query?: ResponseRetrieveParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<Response> {
    const query: ResponseRetrieveParams | undefined = _query;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.responses
      .retrieve(responseId, query, opts)
      .withResponse();

    return finalResponse(result);
  }

  async del(
    responseId: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<void> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.responses
      .del(responseId, opts)
      .withResponse();

    return finalResponse(result);
  }

  async parse<Params extends ResponseCreateParamsWithTools>(
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

    const result = await OAIclient.responses.parse(body, opts);

    return result;
  }

  async stream<Params extends ResponseStreamParams>(
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

    const result = await OAIclient.responses.stream(body, opts);

    return result;
  }

  async cancel(
    responseId: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<void> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const OAIclient = initOpenAIClient(this.client);
    const body = {};
    const options = { body, ...opts };
    const result = await OAIclient.responses
      .cancel(responseId, options)
      .withResponse();
    return finalResponse(result);
  }
}

export class InputItems extends ApiResource {
  async list(
    responseId: string,
    _query?: InputItemListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const query: InputItemListParams | undefined = _query;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.responses.inputItems
      .list(responseId, query, opts)
      .withResponse();

    return finalResponse(result);
  }
}

export interface ResponseRetrieveParams {
  include?: Array<ResponseIncludable>;
}

export interface InputItemListParams extends CursorPageParams {
  before?: string;
  include?: Array<ResponseIncludable>;
  order?: 'asc' | 'desc';
  [key: string]: any;
}

export type ResponseIncludable =
  | 'file_search_call.results'
  | 'message.input_image.image_url'
  | 'computer_call_output.output.image_url';
