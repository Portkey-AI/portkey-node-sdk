import { APIResponseType, ApiClientInterface } from '../_types/generalTypes';
import { ApiResource } from '../apiResource';
import { APIPromise, RequestOptions } from '../baseClient';
import { overrideConfig } from '../utils';
import { createHeaders } from './createHeaders';

export class putMethod extends ApiResource {
  create(
    path: string,
    _body: PutBodyParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<PutResponse> {
    const body = _body;
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const response = this.put<PutResponse>(path, { body, ...opts });
    return response;
  }
}

export type PutResponse = Record<string, any> & APIResponseType;

export type PutBodyParams = Record<string, any>;
