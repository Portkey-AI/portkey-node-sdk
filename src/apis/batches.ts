import { BatchCreateParams, BatchListParams } from 'openai/resources/batches';
import { ApiClientInterface } from '../_types/generalTypes';
import { ApiResource } from '../apiResource';
import { RequestOptions } from '../baseClient';
import { finalResponse, initOpenAIClient, overrideConfig } from '../utils';
import { createHeaders } from './createHeaders';

export class Batches extends ApiResource {
  async create(
    _body: BatchCreateBody,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const body: BatchCreateBody = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.batches.create(body, opts).withResponse();
    return finalResponse(result);
  }

  async retrieve(
    batchId: string,
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

    const result = await OAIclient.batches
      .retrieve(batchId, opts)
      .withResponse();
    return finalResponse(result);
  }

  async list(
    _query?: BatchListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): Promise<any> {
    const query: BatchListParams | undefined = _query;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }

    const OAIclient = initOpenAIClient(this.client);

    const result = await OAIclient.batches.list(query, opts).withResponse();
    return finalResponse(result);
  }

  async cancel(
    batchId: string,
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
    const body = {};
    const options = { body, ...opts };

    const result = await OAIclient.batches
      .cancel(batchId, options)
      .withResponse();
    return finalResponse(result);
  }

  output(
    batchId: string,
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
    const response = this.getMethod<any>(`/batches/${batchId}/output`, opts);
    return response;
  }
}

export interface BatchCreateBody extends BatchCreateParams {
  [key: string]: any;
}
