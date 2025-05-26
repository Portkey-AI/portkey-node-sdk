import { APIResponseType, ApiClientInterface } from '../_types/generalTypes';
import { ApiResource } from '../apiResource';
import { APIPromise, RequestOptions } from '../baseClient';
import { overrideConfig } from '../utils';
import { createHeaders } from './createHeaders';

export class deleteMethod extends ApiResource {
  create(
    path: string,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<DeleteResponse> {
    if (params) {
      const config = overrideConfig(this.client.config, params.config);
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params, config }),
      };
    }
    const response = this.deleteMethod<DeleteResponse>(path, { ...opts });
    return response;
  }
}

export type DeleteResponse = Record<string, any> & APIResponseType;
