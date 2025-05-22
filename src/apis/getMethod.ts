import { APIResponseType, ApiClientInterface } from '../_types/generalTypes';
import { ApiResource } from '../apiResource';
import { APIPromise, RequestOptions } from '../baseClient';
import { overrideConfig } from '../utils';
import { createHeaders } from './createHeaders';

export class getMethod extends ApiResource {
  create(
    path: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<GetResponse> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const response = this.getMethod<GetResponse>(path, { ...opts });
    return response;
  }
}

export type GetResponse = Record<string, any> & APIResponseType;
