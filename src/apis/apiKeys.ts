import { ApiResource } from '../apiResource';
import { APIResponseType, ApiClientInterface } from '../_types/generalTypes';
import { APIPromise, RequestOptions } from '../baseClient';
import { createHeaders } from './createHeaders';
import { toQueryParams } from '../utils';

export interface ApiKeysAddParams {
  type?: string;
  'sub-type'?: string;
  name?: string;
  description?: string;
  workspace_id?: string;
  user_id?: string;
  rate_limits?: Record<string, any>[];
  usage_limits?: Record<string, any>;
  scopes: string[];
  defaults?: Record<string, any>;
}
export interface ApiKeysAddResponse extends APIResponseType {
  id?: string;
  key?: string;
  object?: string;
}
export interface ApiKeysGetParams {
  id?: string;
}
export interface ApiKeysGetResponse extends APIResponseType {
  id?: string;
  key?: string;
  name?: string;
  description?: string;
  type?: string;
  organisation_id?: string;
  workspace_id?: string;
  user_id?: string;
  status?: string;
  created_at?: Date;
  last_updated_at?: Date;
  creation_mode?: string;
  rate_limits?: Record<string, any>[];
  usage_limits?: Record<string, any>;
  reset_usage?: number;
  scopes?: string[];
  defaults?: Record<string, any>;
  object?: string;
}
export interface ApiKeysUpdateParams {
  id?: string;
  name?: string;
  description?: string;
  rate_limits?: Record<string, any>[];
  usage_limits?: Record<string, any>;
  scopes?: string[];
  defaults?: Record<string, any>;
}
export interface ApiKeysListParams {
  page_size?: number;
  current_page?: number;
  workspace_id?: string;
}
export interface ApiKeysListResponse extends APIResponseType {
  total?: number;
  object?: string;
  data?: Record<string, any>[];
}
export interface ApiKeysDeleteParams {
  id?: string;
}
export class ApiKeys extends ApiResource {
  create(
    _body: ApiKeysAddParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ApiKeysAddResponse> {
    const body = _body;
    const type = body.type;
    const subType = body['sub-type'];
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.post<ApiKeysAddResponse>(
      `/api-keys/${type}/${subType}`,
      { body, ...opts }
    );
    return response;
  }

  retrieve(
    _body: ApiKeysGetParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ApiKeysGetResponse> {
    const body = _body;
    const id = body.id;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.getMethod<ApiKeysGetResponse>(`/api-keys/${id}`, {
      ...opts,
    });
    return response;
  }

  update(
    _body: ApiKeysUpdateParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const body = _body;
    const id = body.id;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.put<any>(`/api-keys/${id}`, { body, ...opts });
    return response;
  }
  list(
    _body: ApiKeysListParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<ApiKeysListResponse> {
    const body = _body;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const query = toQueryParams(body);
    const response = this.getMethod<ApiKeysListResponse>(`/api-keys${query}`, {
      ...opts,
    });
    return response;
  }
  delete(
    _body: ApiKeysDeleteParams,
    params?: ApiClientInterface,
    opts?: RequestOptions
  ): APIPromise<any> {
    const body = _body;
    const id = body.id;
    if (params) {
      this.client.customHeaders = {
        ...this.client.customHeaders,
        ...createHeaders({ ...params }),
      };
    }
    const response = this.deleteMethod<any>(`/api-keys/${id}`, {
      body,
      ...opts,
    });
    return response;
  }
}
